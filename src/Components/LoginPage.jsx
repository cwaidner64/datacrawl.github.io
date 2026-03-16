// src/Components/LoginPage.jsx
import React, { useState } from 'react';
import { useAuth } from './AuthContext'; // Fix the import path
import { useNavigate } from 'react-router-dom';
import { UserCircle, Chrome, Github } from 'lucide-react';

const ONBOARDING_ROUTE = '/onboarding/profile';

function LoginPage() {
    const {
        handleLogin,
        handleGoogleLogin,
        handleRegister,
        errorMessage,
        isLoading,
        isLoggedIn,
        requiresOnboarding,
        setErrorMessage,
    } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegisterMode, setIsRegisterMode] = useState(false);

    const googlePopupHelpText = (() => {
        const normalizedError = String(errorMessage || '').toLowerCase();
        if (!normalizedError) {
            return '';
        }

        if (
            normalizedError.includes('popup blocked') ||
            normalizedError.includes('popup was closed') ||
            normalizedError.includes('timed out')
        ) {
            return 'If Google sign-in does not open, allow popups for this site and try again.';
        }

        return '';
    })();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('=== FORM SUBMISSION STARTED ==='); // Debug log
        console.log('Form submitted:', { email, password: '***', isRegisterMode }); // Debug log
        setErrorMessage(''); // Clear any previous error messages when a new submission starts

        // No need for "Form validation passed" log before internal validation

        if (isRegisterMode) {
            console.log('Attempting registration...'); // Debug log
            const result = await handleRegister(email, password, confirmPassword);
            console.log('Registration result:', result); // Debug log
            if (result.success) {
                if (result.hasSession) {
                    navigate(result.requiresOnboarding ? ONBOARDING_ROUTE : '/');
                } else {
                    setIsRegisterMode(false);
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    console.log('Switched to login mode after successful registration');
                }
            }
        } else {
            console.log('Attempting login...'); // Debug log
            const result = await handleLogin(email, password);
            console.log('Login result:', result); // Debug log
            if (result.success) {
                navigate(result.requiresOnboarding ? ONBOARDING_ROUTE : '/');
            }
        }
        console.log('=== FORM SUBMISSION ENDED (AuthContext handles navigation/error display) ==='); // Debug log
        // The AuthContext's handleLogin/handleRegister will navigate on success,
        // or set the errorMessage state on failure, which this component displays.
    };

    // Auto-redirect if already logged in. This ensures if user hits /login while logged in,
    // they are sent to the home page or wherever navigate(from) directs.
    React.useEffect(() => {
        if (isLoggedIn && !isLoading) { // Only navigate if logged in and not currently loading auth status
            navigate(requiresOnboarding ? ONBOARDING_ROUTE : '/');
        }
    }, [isLoggedIn, isLoading, navigate, requiresOnboarding]);

    const handleGoogleSignIn = async () => {
        setErrorMessage('');
        const result = await handleGoogleLogin();
        if (result?.success) {
            navigate(result.requiresOnboarding ? ONBOARDING_ROUTE : '/');
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
            <h2 className="text-3xl font-bold mb-6">
                {isRegisterMode ? 'Register' : 'Login'}
            </h2>
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                {errorMessage && (
                    <p className="text-red-500 mb-4 text-center">{errorMessage}</p>
                )}
                {googlePopupHelpText && (
                    <p className="text-amber-300 mb-4 text-center text-sm">{googlePopupHelpText}</p>
                )}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-300 text-sm font-bold mb-2">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>
                {isRegisterMode && (
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-bold mb-2">
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>
                )}
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        // Removed onClick here. The form's onSubmit handles it.
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : (isRegisterMode ? 'Register' : 'Login')}
                    </button>
                    <button
                        type="button" // Important: keep this as type="button" to prevent form submission
                        onClick={() => {
                            setIsRegisterMode(!isRegisterMode);
                            setErrorMessage(''); // Clear errors when switching modes
                            setEmail(''); // Clear fields when switching modes
                            setPassword('');
                            setConfirmPassword('');
                        }}
                        className="inline-block align-baseline font-bold text-sm text-blue-400 hover:text-blue-200"
                        disabled={isLoading}
                    >
                        {isRegisterMode ? 'Already have an account? Login' : "Don't have an account? Register"}
                    </button>
                </div>
            </form>
            <div className="mt-8 text-center">
                <div className="bg-gray-800 p-5 rounded-lg shadow-lg text-center">
                    <h1 className="text-white text-xl font-bold mb-4">Login</h1>
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="flex items-center justify-center my-2.5 py-2.5 px-5 border-none rounded text-white cursor-pointer no-underline text-center bg-red-600 hover:bg-red-700 transition-colors duration-200"
                        disabled={isLoading}
                    >
                        <Chrome className="w-5 h-5 mr-2" />
                        {isLoading ? 'Connecting...' : 'Login with Google'}
                    </button>
                
                </div>
            </div>
        </div>
    );
}

export default LoginPage;