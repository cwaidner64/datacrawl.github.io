import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { submitProfileOnboarding } from '../config/api';
import { INDUSTRY_SPECIALTY_OPTIONS } from '../config/industrySpecialties';
import { useAuth } from '../Components/AuthContext';

const toFieldErrorMap = (fieldErrors) => {
  if (!fieldErrors || typeof fieldErrors !== 'object') {
    return {};
  }

  return Object.entries(fieldErrors).reduce((accumulator, [field, value]) => {
    if (!field) {
      return accumulator;
    }

    const normalizedMessage = Array.isArray(value)
      ? value.filter(Boolean).join(', ')
      : typeof value === 'string'
        ? value
        : value && typeof value === 'object' && typeof value.message === 'string'
          ? value.message
          : '';

    if (normalizedMessage) {
      accumulator[field] = normalizedMessage;
    }

    return accumulator;
  }, {});
};

const trackEvent = (eventName, payload = {}) => {
  try {
    if (typeof window !== 'undefined' && window?.analytics?.track) {
      window.analytics.track(eventName, payload);
    }
  } catch {
    // no-op
  }
};

const ProfileOnboarding = () => {
  const navigate = useNavigate();
  const {
    accessToken,
    isLoggedIn,
    isLoading,
    requiresOnboarding,
    onboardingCompleted,
    markOnboardingCompleted,
  } = useAuth();

  const [formValues, setFormValues] = useState({
    first_name: '',
    last_name: '',
    avatar_url: '',
    company_name: '',
    role: '',
    industry_specialty: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    trackEvent('onboarding_started', { source: 'profile_onboarding_route' });
  }, []);

  const hasRequiredValues = useMemo(() => {
    return (
      formValues.first_name.trim() &&
      formValues.last_name.trim() &&
      formValues.company_name.trim() &&
      formValues.role.trim() &&
      formValues.industry_specialty.trim()
    );
  }, [formValues]);

  const handleChange = (field, value) => {
    setFormValues((previous) => ({ ...previous, [field]: value }));
    setFieldErrors((previous) => {
      if (!previous[field]) {
        return previous;
      }

      const next = { ...previous };
      delete next[field];
      return next;
    });
    setSubmitError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!accessToken) {
      setSubmitError('You must be logged in to complete onboarding.');
      return;
    }

    const nextFieldErrors = {};

    if (!formValues.first_name.trim()) {
      nextFieldErrors.first_name = 'First name is required.';
    }
    if (!formValues.last_name.trim()) {
      nextFieldErrors.last_name = 'Last name is required.';
    }
    if (!formValues.company_name.trim()) {
      nextFieldErrors.company_name = 'Company name is required.';
    }
    if (!formValues.role.trim()) {
      nextFieldErrors.role = 'Role is required.';
    }
    if (!formValues.industry_specialty.trim()) {
      nextFieldErrors.industry_specialty = 'Industry specialty is required.';
    }

    if (formValues.avatar_url.trim()) {
      try {
        new URL(formValues.avatar_url.trim());
      } catch {
        nextFieldErrors.avatar_url = 'Avatar URL must be a valid URL.';
      }
    }

    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors);
      setSubmitError('Please fix the highlighted fields.');
      trackEvent('onboarding_failed_validation', {
        source: 'profile_onboarding_route',
        fields: Object.keys(nextFieldErrors),
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const payload = {
        first_name: formValues.first_name.trim(),
        last_name: formValues.last_name.trim(),
        company_name: formValues.company_name.trim(),
        role: formValues.role.trim(),
        industry_specialty: formValues.industry_specialty.trim(),
        avatar_url: formValues.avatar_url.trim() ? formValues.avatar_url.trim() : null,
      };

      const response = await submitProfileOnboarding({
        token: accessToken,
        payload,
      });

      const profilePayload = response?.profile || response || {};
      markOnboardingCompleted(profilePayload);
      localStorage.setItem('DC_PROFILE_REFRESH_TS', String(Date.now()));
      window.dispatchEvent(new Event('dc-profile-refresh'));
      trackEvent('onboarding_completed', { source: 'profile_onboarding_route' });
      navigate('/');
    } catch (error) {
      const normalizedFieldErrors = toFieldErrorMap(error?.fieldErrors);
      if (Object.keys(normalizedFieldErrors).length > 0) {
        setFieldErrors(normalizedFieldErrors);
      }

      const nextMessage = error?.message || 'Failed to complete onboarding. Please try again.';
      setSubmitError(nextMessage);

      if (error?.status === 400) {
        trackEvent('onboarding_failed_validation', {
          source: 'profile_onboarding_route',
          fields: Object.keys(normalizedFieldErrors),
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoading && !isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!isLoading && onboardingCompleted === true && !requiresOnboarding) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-lg p-8"
      >
        <h1 className="text-2xl font-bold mb-6">Complete your profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="text-sm text-gray-200">
            First name
            <input
              type="text"
              value={formValues.first_name}
              onChange={(event) => handleChange('first_name', event.target.value)}
              className="mt-1 w-full rounded border border-gray-600 bg-gray-700 p-2 text-white"
            />
            {fieldErrors.first_name && <div className="mt-1 text-xs text-red-400">{fieldErrors.first_name}</div>}
          </label>

          <label className="text-sm text-gray-200">
            Last name
            <input
              type="text"
              value={formValues.last_name}
              onChange={(event) => handleChange('last_name', event.target.value)}
              className="mt-1 w-full rounded border border-gray-600 bg-gray-700 p-2 text-white"
            />
            {fieldErrors.last_name && <div className="mt-1 text-xs text-red-400">{fieldErrors.last_name}</div>}
          </label>

          <label className="text-sm text-gray-200 md:col-span-2">
            Profile photo URL (optional)
            <input
              type="url"
              value={formValues.avatar_url}
              onChange={(event) => handleChange('avatar_url', event.target.value)}
              placeholder="https://..."
              className="mt-1 w-full rounded border border-gray-600 bg-gray-700 p-2 text-white"
            />
            {fieldErrors.avatar_url && <div className="mt-1 text-xs text-red-400">{fieldErrors.avatar_url}</div>}
          </label>

          <label className="text-sm text-gray-200">
            Company name
            <input
              type="text"
              value={formValues.company_name}
              onChange={(event) => handleChange('company_name', event.target.value)}
              className="mt-1 w-full rounded border border-gray-600 bg-gray-700 p-2 text-white"
            />
            {fieldErrors.company_name && <div className="mt-1 text-xs text-red-400">{fieldErrors.company_name}</div>}
          </label>

          <label className="text-sm text-gray-200">
            Role
            <input
              type="text"
              value={formValues.role}
              onChange={(event) => handleChange('role', event.target.value)}
              className="mt-1 w-full rounded border border-gray-600 bg-gray-700 p-2 text-white"
            />
            {fieldErrors.role && <div className="mt-1 text-xs text-red-400">{fieldErrors.role}</div>}
          </label>

          <label className="text-sm text-gray-200 md:col-span-2">
            Industry specialty
            <select
              value={formValues.industry_specialty}
              onChange={(event) => handleChange('industry_specialty', event.target.value)}
              className="mt-1 w-full rounded border border-gray-600 bg-gray-700 p-2 text-white"
            >
              <option value="">Select an industry specialty</option>
              {INDUSTRY_SPECIALTY_OPTIONS.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
            {fieldErrors.industry_specialty && (
              <div className="mt-1 text-xs text-red-400">{fieldErrors.industry_specialty}</div>
            )}
          </label>
        </div>

        {submitError && <div className="mt-4 text-sm text-red-400">{submitError}</div>}

        <button
          type="submit"
          disabled={isSubmitting || !hasRequiredValues}
          className="mt-6 w-full rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Complete onboarding'}
        </button>
      </form>
    </div>
  );
};

export default ProfileOnboarding;
