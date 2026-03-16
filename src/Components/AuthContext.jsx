// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import {
    AUTH_EVENTS,
    clearSessionTokens,
    isRefreshTokenTerminalError,
    loginWithGooglePopup,
    loginUser,
    persistSessionTokens,
    refreshAccessToken,
    registerUser,
    validateAuthToken,
} from '../config/api';
import { jwtDecode } from 'jwt-decode';

// Create the context
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // State for user authentication status
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInEmail, setLoggedInEmail] = useState('');
    const [accessToken, setAccessToken] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Start with true
    const [protectedData, setProtectedData] = useState(null);
    const [protectedDataError, setProtectedDataError] = useState('');
    const [isInitialized, setIsInitialized] = useState(false); // Add this
    const [currentUserId, setCurrentUserId] = useState(null);
    const [requiresOnboarding, setRequiresOnboarding] = useState(false);
    const [onboardingCompleted, setOnboardingCompleted] = useState(null);
    const hasInitializedValidation = useRef(false);
    const refreshTimeoutRef = useRef(null);

    const readBoolean = (value) => {
        if (typeof value === 'boolean') {
            return value;
        }

        if (typeof value === 'string') {
            const normalized = value.trim().toLowerCase();
            if (normalized === 'true') {
                return true;
            }
            if (normalized === 'false') {
                return false;
            }
        }

        return null;
    };

    const extractOnboardingState = (payload = {}) => {
        const requires = readBoolean(payload?.requires_onboarding ?? payload?.requiresOnboarding);
        const completed = readBoolean(payload?.onboarding_completed ?? payload?.onboardingCompleted);

        return {
            requiresOnboarding: requires,
            onboardingCompleted: completed,
        };
    };

    const isAuthInvalidError = (error) => error?.status === 401 || error?.status === 403;

    const clearScheduledRefresh = () => {
        if (refreshTimeoutRef.current) {
            clearTimeout(refreshTimeoutRef.current);
            refreshTimeoutRef.current = null;
        }
    };

    const applySession = (token, email, fallbackUserId = null, refreshToken = null, onboardingState = {}) => {
        if (token) {
            persistSessionTokens({ accessToken: token, refreshToken });
        }

        setAccessToken(token);
        setIsLoggedIn(true);
        if (email) {
            setLoggedInEmail(email);
            localStorage.setItem('DCloggedInEmail', email);
        }
        setUserIdFromToken(token, fallbackUserId);

        if (typeof onboardingState?.requiresOnboarding === 'boolean') {
            setRequiresOnboarding(onboardingState.requiresOnboarding);
        }

        if (typeof onboardingState?.onboardingCompleted === 'boolean') {
            setOnboardingCompleted(onboardingState.onboardingCompleted);
        }

        setErrorMessage('');
    };

    const markOnboardingCompleted = (profilePayload = {}) => {
        const nextEmail = profilePayload?.email || profilePayload?.user_email;
        const nextUserId = profilePayload?.user_id || profilePayload?.userId;

        if (nextEmail) {
            setLoggedInEmail(nextEmail);
            localStorage.setItem('DCloggedInEmail', nextEmail);
        }

        if (nextUserId) {
            localStorage.setItem('DCuserId', String(nextUserId));
            setCurrentUserId(String(nextUserId));
        }

        setRequiresOnboarding(false);
        setOnboardingCompleted(true);
    };

    const scheduleTokenRefresh = (token) => {
        clearScheduledRefresh();
        if (!token) {
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const tokenExp = Number(decodedToken?.exp);
            if (!Number.isFinite(tokenExp) || tokenExp <= 0) {
                return;
            }

            const refreshAt = tokenExp * 1000 - 60 * 1000;
            const delay = Math.max(1_000, refreshAt - Date.now());

            refreshTimeoutRef.current = setTimeout(async () => {
                try {
                    const newToken = await refreshAccessToken();
                    const currentEmail = localStorage.getItem('DCloggedInEmail') || loggedInEmail || '';
                    applySession(newToken.accessToken, currentEmail, localStorage.getItem('DCuserId'), newToken.refreshToken);
                    scheduleTokenRefresh(newToken.accessToken);
                } catch (refreshError) {
                    if (isRefreshTokenTerminalError(refreshError)) {
                        handleLogout();
                        setErrorMessage('Your session has expired. Please log in again.');
                        return;
                    }

                    setErrorMessage('Session refresh temporarily unavailable. You are still signed in.');
                    refreshTimeoutRef.current = setTimeout(() => {
                        scheduleTokenRefresh(token);
                    }, 30_000);
                }
            }, delay);
        } catch {
            // no-op when token payload cannot be decoded
        }
    };

    const setUserIdFromToken = (token, fallbackUserId = null) => {
        try {
            const decodedToken = jwtDecode(token);
            const decodedUserId = decodedToken?.user_id ? String(decodedToken.user_id) : null;
            const finalUserId = decodedUserId || (fallbackUserId ? String(fallbackUserId) : null);

            if (finalUserId) {
                localStorage.setItem('DCuserId', finalUserId);
            } else {
                localStorage.removeItem('DCuserId');
            }

            setCurrentUserId(finalUserId);
        } catch {
            const fallback = fallbackUserId ? String(fallbackUserId) : null;
            if (fallback) {
                localStorage.setItem('DCuserId', fallback);
            } else {
                localStorage.removeItem('DCuserId');
            }
            setCurrentUserId(fallback);
        }
    };

    /**
     * Function to validate the stored access token with the backend.
     */
    const validateStoredToken = async (token) => {
        setIsLoading(true); // Set loading while validating
        try {
            const data = await validateAuthToken(token);
            const nextEmail = data?.email || data?.user_email || localStorage.getItem('DCloggedInEmail') || 'Logged-in User';
            applySession(token, nextEmail, data?.user_id, null, extractOnboardingState(data));
            scheduleTokenRefresh(token);
        } catch (error) {
            console.error('Error validating token:', error);

            if (isAuthInvalidError(error)) {
                try {
                    const refreshedToken = await refreshAccessToken();
                    const refreshedData = await validateAuthToken(refreshedToken.accessToken);
                    const nextEmail =
                        refreshedData?.email ||
                        refreshedData?.user_email ||
                        localStorage.getItem('DCloggedInEmail') ||
                        'Logged-in User';

                    applySession(
                        refreshedToken.accessToken,
                        nextEmail,
                        refreshedData?.user_id,
                        refreshedToken.refreshToken,
                        extractOnboardingState(refreshedData),
                    );
                    scheduleTokenRefresh(refreshedToken.accessToken);
                } catch (refreshError) {
                    if (isRefreshTokenTerminalError(refreshError)) {
                        handleLogout();
                        setErrorMessage('Your session has expired. Please log in again.');
                    } else {
                        applySession(token, localStorage.getItem('DCloggedInEmail') || loggedInEmail, localStorage.getItem('DCuserId'));
                        scheduleTokenRefresh(token);
                        setErrorMessage('Session check temporarily unavailable. You are still signed in.');
                    }
                }
            } else {
                applySession(token, localStorage.getItem('DCloggedInEmail') || loggedInEmail, localStorage.getItem('DCuserId'));
                scheduleTokenRefresh(token);
                setErrorMessage('Session check temporarily unavailable. You are still signed in.');
            }
        } finally {
            setIsLoading(false);
            setIsInitialized(true);
        }
    };

    /**
     * Handles the login process.
     * Stores the received access_token in localStorage upon successful login.
     */
    const handleLogin = async (email, password) => {
        setErrorMessage('');
        setIsLoading(true);

        try {
            const data = await loginUser({ email, password });
            const onboardingState = extractOnboardingState(data);

            if (data.access_token) {
                applySession(
                    data.access_token,
                    email,
                    data.user_id,
                    data.refresh_token || data.refreshToken || null,
                    onboardingState,
                );
                scheduleTokenRefresh(data.access_token);

                // Return success - let the component handle navigation
                return {
                    success: true,
                    hasSession: true,
                    requiresOnboarding:
                        onboardingState.requiresOnboarding === true || onboardingState.onboardingCompleted === false,
                };

            } else {
                throw new Error('Login successful but no access token received.');
            }

        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage(error.message || 'An error occurred during login. Please try again.');
            return { success: false, error: error.message };
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setErrorMessage('');
        setIsLoading(true);

        try {
            const data = await loginWithGooglePopup();
            const nextAccessToken = data?.access_token || data?.token || data?.accessToken || null;
            const nextRefreshToken = data?.refresh_token || data?.refreshToken || null;
            const nextEmail =
                data?.email ||
                data?.user_email ||
                localStorage.getItem('DCloggedInEmail') ||
                'Logged-in User';
            const nextUserId = data?.user_id || data?.userId || null;
            const onboardingState = extractOnboardingState(data);

            if (!nextAccessToken) {
                throw new Error('Google login successful but no access token received.');
            }

            applySession(nextAccessToken, nextEmail, nextUserId, nextRefreshToken, onboardingState);
            scheduleTokenRefresh(nextAccessToken);
            return {
                success: true,
                hasSession: true,
                requiresOnboarding:
                    onboardingState.requiresOnboarding === true || onboardingState.onboardingCompleted === false,
            };
        } catch (error) {
            console.error('Google login error:', error);
            setErrorMessage(error.message || 'Google login failed. Please try again.');
            return { success: false, error: error.message };
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Handles user registration.
     */
   const handleRegister = async (email, password, confirmPassword) => {
    setErrorMessage('');
    setIsLoading(true);

    if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        setIsLoading(false);
        return { success: false, error: "Passwords do not match." };
    }

    try {
        const data = await registerUser({ email, password });
        const nextAccessToken = data?.access_token || data?.token || data?.accessToken || null;
        const nextRefreshToken = data?.refresh_token || data?.refreshToken || null;
        const nextEmail =
            data?.email ||
            data?.user_email ||
            email ||
            localStorage.getItem('DCloggedInEmail') ||
            'Logged-in User';
        const nextUserId = data?.user_id || data?.userId || null;
        const onboardingState = extractOnboardingState(data);

        if (nextAccessToken) {
            applySession(nextAccessToken, nextEmail, nextUserId, nextRefreshToken, onboardingState);
            scheduleTokenRefresh(nextAccessToken);
        }

        setErrorMessage('');
        return {
            success: true,
            hasSession: Boolean(nextAccessToken),
            requiresOnboarding:
                onboardingState.requiresOnboarding === true || onboardingState.onboardingCompleted === false,
        };

    } catch (error) {
        if (error.message?.toLowerCase().includes('exists') || error.message?.includes('409')) {
            setErrorMessage("Email already exists. Please use a different email or log in.");
            setIsLoading(false);
            return { success: false, error: "Email already exists." };
        }
        setErrorMessage(error.message || 'An error occurred during registration. Please try again.');
        return { success: false, error: error.message };
    } finally {
        setIsLoading(false);
    }
};


    /**
     * Handles the logout process.
     * Clears access_token from localStorage and updates state.
     */
    const handleLogout = () => {
        clearScheduledRefresh();
        clearSessionTokens();
        localStorage.removeItem('DCaccessToken');
        localStorage.removeItem('DCrefreshToken');
        localStorage.removeItem('DCloggedInEmail'); // Clear stored email too
        localStorage.removeItem('DCuserId');
        setAccessToken(null);
        setCurrentUserId(null);
        setRequiresOnboarding(false);
        setOnboardingCompleted(null);
        setIsLoggedIn(false);
        setLoggedInEmail('');
        setErrorMessage('');
        setProtectedData(null);
        setProtectedDataError('');
        console.log("Logged out successfully.");
        // Navigation will be handled by the component that calls this
    };

    /**
     * Example function to call a protected API endpoint.
     */
    const fetchProtectedData = async () => {
        setProtectedDataError('Protected test endpoint is not configured for this backend.');
        setProtectedData(null);
    };


    // Run on component mount to check for stored token
    useEffect(() => {
        if (hasInitializedValidation.current) {
            return;
        }
        hasInitializedValidation.current = true;

        console.log("AuthProvider mounted, checking for stored token...");
        const storedAccessToken = localStorage.getItem('DCaccessToken');
        const storedEmail = localStorage.getItem('DCloggedInEmail'); // Also check for stored email
        
        if (storedAccessToken) {
            console.log("Found stored token, validating...");
            if (storedEmail) {
                setLoggedInEmail(storedEmail); // Set the email before validation
            }
            validateStoredToken(storedAccessToken);
        } else {
            console.log("No stored token found");
            setIsLoading(false);
            setIsInitialized(true);
        }
    }, []); // Empty dependency array means this runs once on mount

    useEffect(() => {
        const handleTokenUpdated = (event) => {
            const nextToken = event?.detail?.accessToken || event?.detail?.token || null;

            if (!nextToken) {
                clearScheduledRefresh();
                setAccessToken(null);
                setCurrentUserId(null);
                setRequiresOnboarding(false);
                setOnboardingCompleted(null);
                setIsLoggedIn(false);
                setLoggedInEmail('');
                return;
            }

            if (nextToken === accessToken) {
                return;
            }

            setAccessToken(nextToken);
            setIsLoggedIn(true);
            setUserIdFromToken(nextToken, localStorage.getItem('DCuserId'));
            scheduleTokenRefresh(nextToken);
        };

        window.addEventListener(AUTH_EVENTS.tokenUpdated, handleTokenUpdated);
        return () => {
            window.removeEventListener(AUTH_EVENTS.tokenUpdated, handleTokenUpdated);
        };
    }, [accessToken]);

    useEffect(() => {
        return () => {
            clearScheduledRefresh();
        };
    }, []);

    // Don't render children until initialization is complete
    if (!isInitialized) {
        return <div className="flex items-center justify-center min-h-screen">
            <div className="text-lg">Loading...</div>
        </div>;
    }

    // Provide these values to any consuming component
    const authContextValue = {
        isLoggedIn,
        loggedInEmail,
        accessToken,
        errorMessage,
        isLoading,
        protectedData,
        protectedDataError,
        isInitialized, // Add this for components that need to know initialization status
        currentUserId,
        requiresOnboarding,
        onboardingCompleted,
        handleLogin,
        handleGoogleLogin,
        handleRegister,
        handleLogout,
        fetchProtectedData,
        setErrorMessage, // Allow components to clear their own errors if needed
        markOnboardingCompleted,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for easier consumption of the auth context
export const useAuth = () => {
    return useContext(AuthContext);
};