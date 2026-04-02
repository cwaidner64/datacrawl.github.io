const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_BASE = VITE_API_BASE_URL || "http://localhost:8080";
const DEFAULT_PLATFORM_API_KEY_HEADER = import.meta.env.VITE_API_KEY_HEADER || "X-API-Key";

export const API_ENDPOINTS = {
  system: {
    hello: "/hello",
    healthz: "/healthz",
    demoSuccess: "/demo/success",
    downloadById: "/download/{id}",
  },
  auth: {
    login: "/api/v1/auth/login",
    register: "/api/v1/auth/register",
    validateToken: "/api/v1/auth/validate-token",
    refreshToken: "/api/v1/auth/refresh",
    googleStart: "/api/v1/auth/google/start",
    googleCallback: "/api/v1/auth/google/callback",
  },
  market: {
    categories: "/market/categories",
    items: "/market/items/v2",
    endpoints: "/market/endpoints",
    v1Categories: "/api/v1/market/categories",
    v1Items: "/api/v1/market/items",
    vendorTemplate: "/api/v1/market/vendors/template",
    vendorEndpointCallTemplate: "/api/v1/market/vendors/{vendorId}/endpoints/{endpointId}/template",
  },
  payments: {
    stripeWebhook: "/api/v1/payments/stripe/webhook",
    stripeSetupIntent: "/api/v1/payments/stripe/setup-intent",
    stripePaymentMethods: "/api/v1/payments/stripe/payment-methods",
    stripePaymentMethodDefault: "/api/v1/payments/stripe/payment-methods/{paymentMethodId}/default",
    stripePaymentMethodById: "/api/v1/payments/stripe/payment-methods/{paymentMethodId}",
    apiBillingStatus: "/api/v1/payments/api-billing/status",
  },
  publicProfiles: "/api/v1/public/profiles",
  profile: {
    me: "/api/v1/profile/me",
    update: "/api/v1/profile",
    onboarding: "/api/v1/profile/onboarding",
  },
  publicDatasets: "/api/v1/public/datasets",
  datasets: {
    upload: "/api/v1/datasets/upload",
    private: "/api/v1/datasets/private",
    schema: "/api/v1/datasets/{datasetId}/schema",
    uploadStatus: "/api/v1/datasets/uploads/{uploadId}",
    reviews: "/api/v1/datasets/{datasetId}/reviews",
    reviewById: "/api/v1/datasets/{datasetId}/reviews/{reviewId}",
    previewRows: "/api/v1/datasets/{datasetId}/preview-rows",
    related: "/api/v1/datasets/{datasetId}/related",
    publicRelated: "/api/v1/public/datasets/{datasetId}/related",
  },
  credits: {
    fund: "/api/v1/credits/purchase",
    balance: "/api/v1/credits/balance",
    purchaseStatus: "/api/v1/credits/purchase-status/{paymentIntentID}",
  },
  payouts: {
    stripeOnboardingLink: "/api/v1/payouts/stripe/onboarding-link",
    stripeStatus: "/api/v1/payouts/stripe/status",
  },
  admin: {
    payoutBlockedSellers: "/api/v1/admin/payout-blocked-sellers",
    payoutRetryBlocked: "/api/v1/admin/payouts/retry-blocked",
    payoutRetryById: "/api/v1/admin/payouts/{payoutId}/retry",
    uploadsQueueHealth: "/api/v1/admin/uploads/queue-health",
    uploadsIngestionById: "/api/v1/admin/uploads/ingestions/{ingestionId}",
    uploadsRequeueStuck: "/api/v1/admin/uploads/requeue-stuck",
  },
  platformAdmin: {
    vendorEndpoints: "/api/v1/admin/vendors/{vendorId}/endpoints",
    vendorEndpointAllowed:
      "/api/v1/admin/vendors/{vendorId}/endpoints/{endpointId}/allowed",
    vendorEndpointPricing:
      "/api/v1/admin/vendors/{vendorId}/endpoints/{endpointId}/pricing",
    userVendorAccess:
      "/api/v1/admin/users/{userId}/vendors/{vendorId}/access",
  },
  vendors: {
    proxy: "/api/v1/vendors/{vendorId}/{proxyPath}",
    applications: "/api/v1/vendors/applications",
  },
  vendorAdmin: {
    applications: "/api/v1/admin/vendor-applications",
    applicationReview: "/api/v1/admin/vendor-applications/{applicationId}/review",
    applicationDocumentDownload:
      "/api/v1/admin/vendor-applications/{applicationId}/documents/{documentId}/download",
  },
  paymentsHistory: {
    history: "/api/v1/payments/history",
  },
  invocations: {
    list: "/api/v1/invocations",
    byId: "/api/v1/invocations/{invocationId}",
  },
  training: {
    start: "/api/train",
  },
};

export const buildApiUrl = (path) => {
  const normalizedBase = String(API_BASE || "").replace(/\/+$/, "");
  const normalizedPath = `/${String(path || "").replace(/^\/+/, "")}`;
  return `${normalizedBase}${normalizedPath}`;
};

const ACCESS_TOKEN_STORAGE_KEY = "DCaccessToken";
const REFRESH_TOKEN_STORAGE_KEY = "DCrefreshToken";
const TOKEN_UPDATED_EVENT = "dc-auth-token-updated";
let activeRefreshPromise = null;

const REFRESH_TOKEN_FAILURE_CODES = new Set([
  "refresh_token_invalid",
  "refresh_token_expired",
  "refresh_token_revoked",
]);
const AUTH_PATHS_WITHOUT_REFRESH = new Set([
  API_ENDPOINTS.auth.login,
  API_ENDPOINTS.auth.register,
  API_ENDPOINTS.auth.refreshToken,
]);

const extractErrorDetails = async (response, fallbackMessage) => {
  try {
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const errorData = await response.json();
      const fieldErrors =
        errorData.field_errors ||
        errorData.fieldErrors ||
        errorData.errors ||
        null;

      return {
        message: errorData.message || errorData.error || fallbackMessage,
        errorCode: errorData.error_code || errorData.code || null,
        fieldErrors:
          fieldErrors && typeof fieldErrors === "object"
            ? fieldErrors
            : null,
      };
    }

    const text = await response.text();
    return {
      message: text || fallbackMessage,
      errorCode: null,
      fieldErrors: null,
    };
  } catch {
    return {
      message: fallbackMessage,
      errorCode: null,
      fieldErrors: null,
    };
  }
};

const updateStoredTokens = ({ accessToken = null, refreshToken = null, clearRefresh = false } = {}) => {
  if (accessToken) {
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
  } else {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  }

  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
  } else if (clearRefresh) {
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(TOKEN_UPDATED_EVENT, {
        detail: {
          token: accessToken || null,
          accessToken: accessToken || null,
          refreshToken: refreshToken || null,
        },
      }),
    );
  }
};

const createHttpError = ({ status, message, errorCode, fieldErrors }) => {
  const error = new Error(message);
  error.status = status;
  error.errorCode = errorCode || null;
  error.fieldErrors = fieldErrors || null;
  return error;
};

const shouldSkipRefreshForPath = (path) => {
  if (!path) {
    return false;
  }

  const normalizedPath = path.split("?")[0];
  return AUTH_PATHS_WITHOUT_REFRESH.has(normalizedPath);
};

const applyPathParams = (pathTemplate, params = {}) =>
  pathTemplate.replace(/\{(\w+)\}/g, (_, key) => encodeURIComponent(params[key] ?? ""));

const getPlatformAuthHeaders = ({ token, apiKey, apiKeyHeader = DEFAULT_PLATFORM_API_KEY_HEADER } = {}) => ({
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
  ...(apiKey ? { [apiKeyHeader]: apiKey } : {}),
});

const getAdminApiKeyHeaders = ({ adminApiKey } = {}) => ({
  ...(adminApiKey ? { "X-Admin-Api-Key": adminApiKey } : {}),
});

const GOOGLE_OAUTH_MESSAGE_TYPE = "google_oauth_result";
const GOOGLE_OAUTH_POPUP_TIMEOUT_MS = 120_000;

const getApiOrigin = () => {
  try {
    return new URL(API_BASE).origin;
  } catch {
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    return "";
  }
};

export const isRefreshTokenTerminalError = (error) =>
  error?.status === 401 && REFRESH_TOKEN_FAILURE_CODES.has(error?.errorCode || "");

export const refreshAccessToken = async () => {
  if (activeRefreshPromise) {
    return activeRefreshPromise;
  }

  activeRefreshPromise = (async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
    if (!refreshToken) {
      const missingTokenError = new Error("No refresh token available.");
      missingTokenError.status = 401;
      missingTokenError.errorCode = "refresh_token_invalid";
      throw missingTokenError;
    }

    const response = await fetch(buildApiUrl(API_ENDPOINTS.auth.refreshToken), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) {
      const fallbackMessage = `Request failed with status ${response.status}.`;
      const details = await extractErrorDetails(response, fallbackMessage);
      throw createHttpError({
        status: response.status,
        message: details.message,
        errorCode: details.errorCode,
      });
    }

    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json") ? await response.json() : null;
    const refreshedAccessToken = data?.access_token || data?.token || data?.accessToken || null;
    const refreshedRefreshToken = data?.refresh_token || data?.refreshToken || null;

    if (!refreshedAccessToken) {
      throw new Error("Refresh succeeded but no access token was returned.");
    }

    if (!refreshedRefreshToken) {
      throw new Error("Refresh succeeded but no refresh token was returned.");
    }

    updateStoredTokens({
      accessToken: refreshedAccessToken,
      refreshToken: refreshedRefreshToken,
    });
    return {
      accessToken: refreshedAccessToken,
      refreshToken: refreshedRefreshToken,
    };
  })();

  try {
    return await activeRefreshPromise;
  } finally {
    activeRefreshPromise = null;
  }
};

const request = async (
  path,
  { method = "GET", token, body, headers = {}, skipAuthRefresh = false } = {},
) => {
  const isFormDataBody = typeof FormData !== "undefined" && body instanceof FormData;

  const response = await fetch(buildApiUrl(path), {
    method,
    headers: {
      ...(body && !isFormDataBody ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...(body !== undefined
      ? {
          body: isFormDataBody ? body : JSON.stringify(body),
        }
      : {}),
  });

  if (!response.ok) {
    const fallbackMessage = `Request failed with status ${response.status}.`;
    const details = await extractErrorDetails(response, fallbackMessage);
    const currentError = createHttpError({
      status: response.status,
      message: details.message,
      errorCode: details.errorCode,
      fieldErrors: details.fieldErrors,
    });

    const shouldAttemptRefresh =
      !skipAuthRefresh &&
      response.status === 401 &&
      token &&
      !shouldSkipRefreshForPath(path);

    if (shouldAttemptRefresh) {
      try {
        const refreshedSession = await refreshAccessToken();
        return request(path, {
          method,
          token: refreshedSession.accessToken,
          body,
          headers,
          skipAuthRefresh: true,
        });
      } catch (refreshError) {
        if (isRefreshTokenTerminalError(refreshError)) {
          updateStoredTokens({ accessToken: null, clearRefresh: true });
        }
        throw refreshError;
      }
    }

    throw currentError;
  }

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return null;
  }

  return response.json();
};

export const getAuthHeaders = (token) => ({
  "Content-Type": "application/json",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

export const loginUser = ({ email, password }) =>
  request(API_ENDPOINTS.auth.login, {
    method: "POST",
    body: { email, password },
  });

export const buildGoogleOAuthStartUrl = ({
  redirectUri,
  responseMode = "web_message",
  clientOrigin,
} = {}) => {
  const backendOrigin = getApiOrigin();
  const resolvedRedirectUri = redirectUri || `${backendOrigin}${API_ENDPOINTS.auth.googleCallback}`;
  const resolvedClientOrigin =
    clientOrigin || (typeof window !== "undefined" ? window.location.origin : "");

  const startUrl = new URL(buildApiUrl(API_ENDPOINTS.auth.googleStart));
  startUrl.searchParams.set("redirect_uri", resolvedRedirectUri);

  if (responseMode) {
    startUrl.searchParams.set("response_mode", responseMode);
  }

  if (responseMode === "web_message" && resolvedClientOrigin) {
    startUrl.searchParams.set("client_origin", resolvedClientOrigin);
  }

  return startUrl.toString();
};

export const loginWithGooglePopup = ({
  timeoutMs = GOOGLE_OAUTH_POPUP_TIMEOUT_MS,
  popupName = "google_oauth",
  popupFeatures = "width=520,height=720",
} = {}) => {
  if (typeof window === "undefined") {
    throw new Error("Google login is only available in a browser environment.");
  }

  const backendOrigin = getApiOrigin();
  const startUrl = buildGoogleOAuthStartUrl({
    responseMode: "web_message",
    clientOrigin: window.location.origin,
    redirectUri: `${backendOrigin}${API_ENDPOINTS.auth.googleCallback}`,
  });

  const popup = window.open(startUrl, popupName, popupFeatures);
  if (!popup) {
    throw new Error("Popup blocked by browser.");
  }

  return new Promise((resolve, reject) => {
    let timeoutHandle = null;
    let popupClosePollHandle = null;

    const cleanup = () => {
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
      }
      if (popupClosePollHandle) {
        clearInterval(popupClosePollHandle);
      }
      window.removeEventListener("message", handleMessage);
      try {
        popup.close();
      } catch {
        // no-op
      }
    };

    const rejectWithCleanup = (error) => {
      cleanup();
      reject(error instanceof Error ? error : new Error(String(error || "Google login failed.")));
    };

    const resolveWithCleanup = (result) => {
      cleanup();
      resolve(result);
    };

    const handleMessage = (event) => {
      if (event.origin !== backendOrigin) {
        return;
      }

      const payload = event.data || {};
      if (payload.type !== GOOGLE_OAUTH_MESSAGE_TYPE) {
        return;
      }

      if (payload.error) {
        rejectWithCleanup(new Error(payload.error));
        return;
      }

      resolveWithCleanup(payload.result || null);
    };

    timeoutHandle = setTimeout(() => {
      rejectWithCleanup(new Error("Google login timed out."));
    }, timeoutMs);

    popupClosePollHandle = setInterval(() => {
      if (popup.closed) {
        rejectWithCleanup(new Error("Google login popup was closed before completing sign in."));
      }
    }, 500);

    window.addEventListener("message", handleMessage);
  });
};

export const AUTH_EVENTS = {
  tokenUpdated: TOKEN_UPDATED_EVENT,
};

export const persistAccessToken = (token) => {
  updateStoredTokens({ accessToken: token || null });
};

export const persistSessionTokens = ({ accessToken, refreshToken }) => {
  updateStoredTokens({
    accessToken: accessToken || null,
    refreshToken: refreshToken || null,
  });
};

export const clearSessionTokens = () => {
  updateStoredTokens({ accessToken: null, clearRefresh: true });
};

export const registerUser = ({ email, password }) =>
  request(API_ENDPOINTS.auth.register, {
    method: "POST",
    body: { email, password },
  });

export const validateAuthToken = (token) =>
  request(API_ENDPOINTS.auth.validateToken, {
    method: "GET",
    token,
  });

export const fetchMarketCategories = async (token) =>
  request(API_ENDPOINTS.market.categories, {
    method: "GET",
    token,
  });

export const fetchMarketItemDetail = async ({ token, itemId }) =>
  request(`${API_ENDPOINTS.market.items}/${encodeURIComponent(itemId)}`, {
    method: "GET",
    token,
  });

export const fetchHello = () =>
  request(API_ENDPOINTS.system.hello, {
    method: "GET",
  });

export const fetchHealthz = () =>
  request(API_ENDPOINTS.system.healthz, {
    method: "GET",
  });

export const fetchDemoSuccess = () =>
  request(API_ENDPOINTS.system.demoSuccess, {
    method: "GET",
  });

export const fetchDownloadById = ({ id }) =>
  request(applyPathParams(API_ENDPOINTS.system.downloadById, { id }), {
    method: "GET",
  });

export const fetchV1MarketCategories = async (token) =>
  request(API_ENDPOINTS.market.v1Categories, {
    method: "GET",
    token,
  });

export const fetchV1MarketItems = async ({ token, query, category, type, sortBy }) => {
  const params = new URLSearchParams({
    q: query || "",
    category: category || "all",
    type: type || "all",
    sortBy: sortBy || "dateAdded",
  });

  return request(`${API_ENDPOINTS.market.v1Items}?${params.toString()}`, {
    method: "GET",
    token,
  });
};

export const fetchV1MarketItemDetail = async ({ token, itemId }) =>
  request(`${API_ENDPOINTS.market.v1Items}/${encodeURIComponent(itemId)}`, {
    method: "GET",
    token,
  });

export const fetchMarketItemSchema = async ({
  token,
  datasetId,
  id,
  itemId,
  includeNulls = false,
} = {}) => {
  const resolvedDatasetId = String(datasetId ?? id ?? itemId ?? "").trim();
  if (!resolvedDatasetId) {
    throw new Error("A valid datasetId is required to fetch schema.");
  }

  const schemaPath = applyPathParams(API_ENDPOINTS.datasets.schema, {
    datasetId: resolvedDatasetId,
  });
  const params = new URLSearchParams();
  if (includeNulls) {
    params.set("include_nulls", "true");
  }

  const url = params.toString() ? `${schemaPath}?${params.toString()}` : schemaPath;
  return request(url, {
    method: "GET",
    token,
  });
};

export const fetchMarketItems = async ({ token, query, category, type, sortBy }) => {
  const params = new URLSearchParams({
    q: query || "",
    category: category || "all",
    type: type || "all",
    sortBy: sortBy || "dateAdded",
  });

  return request(`${API_ENDPOINTS.market.items}?${params.toString()}`, {
    method: "GET",
    token,
  });
};

export const fetchMarketEndpoints = async ({ token } = {}) =>
  request(API_ENDPOINTS.market.endpoints, {
    method: "GET",
    token,
  });

export const fetchVendorEndpointCallTemplate = async ({ token, vendorId, endpointId } = {}) => {
  const resolvedVendorId = String(vendorId || "").trim();
  const resolvedEndpointId = String(endpointId || "").trim();

  if (!resolvedVendorId || !resolvedEndpointId) {
    throw new Error("vendorId and endpointId are required to fetch endpoint call template.");
  }

  return request(
    applyPathParams(API_ENDPOINTS.market.vendorEndpointCallTemplate, {
      vendorId: resolvedVendorId,
      endpointId: resolvedEndpointId,
    }),
    {
      method: "GET",
      token,
    },
  );
};

export const fetchPublicProfile = (userId) =>
  request(`${API_ENDPOINTS.publicProfiles}/${encodeURIComponent(userId)}`, {
    method: "GET",
  });

export const fetchPublicProfiles = ({ q = "", query, sortBy = "newest", limit = 20, offset = 0 } = {}) => {
  const normalizedQuery = String(q || query || "");
  const normalizedSortBy = ["newest", "rating", "name"].includes(String(sortBy))
    ? String(sortBy)
    : "newest";
  const params = new URLSearchParams();
  params.set("q", normalizedQuery);
  params.set("sortBy", normalizedSortBy);
  params.set("limit", String(limit));
  params.set("offset", String(offset));

  return request(`${API_ENDPOINTS.publicProfiles}?${params.toString()}`, {
    method: "GET",
  });
};

export const getMyProfile = ({ token }) =>
  request(API_ENDPOINTS.profile.me, {
    method: "GET",
    token,
  });

export const updateMyProfile = ({ token, payload }) =>
  request(API_ENDPOINTS.profile.update, {
    method: "PATCH",
    token,
    body: payload,
  });

export const submitProfileOnboarding = ({ token, payload }) =>
  request(API_ENDPOINTS.profile.onboarding, {
    method: "POST",
    token,
    body: payload,
  });

export const fetchPublicProfileRating = (userId) =>
  request(`${API_ENDPOINTS.publicProfiles}/${encodeURIComponent(userId)}/rating`, {
    method: "GET",
  });

export const fetchPublicDataset = (datasetId) =>
  request(`${API_ENDPOINTS.publicDatasets}/${encodeURIComponent(datasetId)}`, {
    method: "GET",
  });

export const fetchPrivateDatasets = (token) =>
  request(API_ENDPOINTS.datasets.private, {
    method: "GET",
    token,
  });

export const uploadDatasetFile = async ({ token, file, title, name, description, visibility = "private" }) => {
  const formData = new FormData();
  formData.append("file", file);

  const datasetTitle = (title || name || "").trim();
  if (datasetTitle) {
    formData.append("title", datasetTitle);
    formData.append("name", datasetTitle);
  }

  if (description) {
    formData.append("description", description);
  }

  formData.append("visibility", visibility);

  const response = await fetch(buildApiUrl(API_ENDPOINTS.datasets.upload), {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  if (!response.ok) {
    const fallbackMessage = `Request failed with status ${response.status}.`;
    const details = await extractErrorDetails(response, fallbackMessage);
    throw createHttpError({
      status: response.status,
      message: details.message,
      errorCode: details.errorCode,
      fieldErrors: details.fieldErrors,
    });
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return null;
  }

  return response.json();
};

export const fundCredits = ({
  token,
  credits,
  paymentMethodId,
  externalPaymentId,
  idempotencyKey,
}) =>
  request(API_ENDPOINTS.credits.fund, {
    method: "POST",
    token,
    headers: {
      ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
    },
    body: {
      credits,
      payment_method_id: paymentMethodId,
      external_payment_id: externalPaymentId,
    },
  });

export const fetchCreditsPurchaseStatus = ({ token, paymentIntentID }) =>
  request(applyPathParams(API_ENDPOINTS.credits.purchaseStatus, { paymentIntentID }), {
    method: "GET",
    token,
  });

export const fetchCreditsBalance = (token) =>
  request(API_ENDPOINTS.credits.balance, {
    method: "GET",
    token,
  });

export const fetchPaymentsHistory = ({ token, limit = 20, offset = 0, eventType, direction } = {}) => {
  const params = new URLSearchParams();
  params.set("limit", String(limit));
  params.set("offset", String(offset));

  if (eventType) {
    const normalizedEventType = Array.isArray(eventType)
      ? eventType.filter(Boolean).join(",")
      : String(eventType).trim();

    if (normalizedEventType) {
      params.set("event_type", normalizedEventType);
    }
  }

  if (direction) {
    params.set("direction", String(direction).trim());
  }

  return request(`${API_ENDPOINTS.paymentsHistory.history}?${params.toString()}`, {
    method: "GET",
    token,
  });
};

export const createStripeWebhookEvent = ({ payload }) =>
  request(API_ENDPOINTS.payments.stripeWebhook, {
    method: "POST",
    body: payload,
    skipAuthRefresh: true,
  });

export const createStripeSetupIntent = ({ token }) =>
  request(API_ENDPOINTS.payments.stripeSetupIntent, {
    method: "POST",
    token,
  });

export const fetchStripePaymentMethods = ({ token }) =>
  request(API_ENDPOINTS.payments.stripePaymentMethods, {
    method: "GET",
    token,
  });

export const setDefaultStripePaymentMethod = ({ token, paymentMethodId }) =>
  request(
    applyPathParams(API_ENDPOINTS.payments.stripePaymentMethodDefault, {
      paymentMethodId,
    }),
    {
      method: "POST",
      token,
    },
  );

export const detachStripePaymentMethod = ({ token, paymentMethodId }) =>
  request(
    applyPathParams(API_ENDPOINTS.payments.stripePaymentMethodById, {
      paymentMethodId,
    }),
    {
      method: "DELETE",
      token,
    },
  );

export const fetchApiBillingStatus = ({ token }) =>
  request(API_ENDPOINTS.payments.apiBillingStatus, {
    method: "GET",
    token,
  });

export const createStripeOnboardingLink = ({ token, refreshUrl, returnUrl }) =>
  request(API_ENDPOINTS.payouts.stripeOnboardingLink, {
    method: "POST",
    token,
    body: {
      refresh_url: refreshUrl,
      return_url: returnUrl,
    },
  });

export const fetchStripeOnboardingStatus = ({ token }) =>
  request(API_ENDPOINTS.payouts.stripeStatus, {
    method: "GET",
    token,
  });

export const authorizeDatasetDownload = ({ token, datasetId, idempotencyKey }) =>
  request(`/api/v1/datasets/${encodeURIComponent(datasetId)}/download-authorize`, {
    method: "POST",
    token,
    headers: {
      ...(idempotencyKey
        ? {
            "Idempotency-Key": idempotencyKey,

          }
        : {}),
    },
  });

export const fetchDatasetUploadStatus = ({ token, uploadId }) =>
  request(applyPathParams(API_ENDPOINTS.datasets.uploadStatus, { uploadId }), {
    method: "GET",
    token,
  });

export const createDatasetReview = ({ token, datasetId, rating, comment }) =>
  request(applyPathParams(API_ENDPOINTS.datasets.reviews, { datasetId }), {
    method: "POST",
    token,
    body: { rating, comment },
  });

export const upsertDatasetReview = async ({ token, datasetId, reviewId, rating, comment }) => {
  const normalizedReviewId = String(reviewId || "").trim();
  if (normalizedReviewId) {
    try {
      return await request(
        applyPathParams(API_ENDPOINTS.datasets.reviewById, {
          datasetId,
          reviewId: normalizedReviewId,
        }),
        {
          method: "PATCH",
          token,
          body: { rating, comment },
        },
      );
    } catch (updateError) {
      const shouldFallback = updateError?.status === 404 || updateError?.status === 405;
      if (!shouldFallback) {
        throw updateError;
      }
    }
  }

  return createDatasetReview({ token, datasetId, rating, comment });
};

export const fetchDatasetReviews = ({ datasetId, token, limit = 50, offset = 0 } = {}) => {
  const params = new URLSearchParams();
  params.set("limit", String(limit));
  params.set("offset", String(offset));

  const basePath = applyPathParams(API_ENDPOINTS.datasets.reviews, { datasetId });
  return request(`${basePath}?${params.toString()}`, {
    method: "GET",
    token,
  });
};

export const fetchDatasetPreviewRows = ({ datasetId, token, rows = 20 } = {}) => {
  const params = new URLSearchParams();
  const numericRows = Number(rows);
  const clampedRows = Number.isFinite(numericRows) ? Math.max(1, Math.min(50, numericRows)) : 20;
  params.set("rows", String(clampedRows));

  const basePath = applyPathParams(API_ENDPOINTS.datasets.previewRows, { datasetId });
  return request(`${basePath}?${params.toString()}`, {
    method: "GET",
    token,
  });
};

export const fetchRelatedDatasets = async ({ datasetId, token, limit = 3 } = {}) => {
  const params = new URLSearchParams();
  const numericLimit = Number(limit);
  const normalizedLimit = Number.isFinite(numericLimit) ? Math.max(1, numericLimit) : 3;
  params.set("limit", String(normalizedLimit));

  const basePath = applyPathParams(API_ENDPOINTS.datasets.related, { datasetId });
  try {
    return await request(`${basePath}?${params.toString()}`, {
      method: "GET",
      token,
    });
  } catch (error) {
    const isFallbackCandidate = error?.status === 404 || error?.status === 405;
    if (!isFallbackCandidate) {
      throw error;
    }

    const publicAliasPath = applyPathParams(API_ENDPOINTS.datasets.publicRelated, { datasetId });
    return request(`${publicAliasPath}?${params.toString()}`, {
      method: "GET",
    });
  }
};

export const updateDatasetVisibility = ({ token, datasetId, visibility }) =>
  request(`/api/v1/datasets/${encodeURIComponent(datasetId)}/visibility`, {
    method: "PATCH",
    token,
    body: { visibility },
  });

export const startDatasetTraining = ({ token, datasetId, endpointUrl }) =>
  request(API_ENDPOINTS.training.start, {
    method: "POST",
    token,
    body: {
      dataset_id: datasetId,
      endpoint_url: endpointUrl,
    },
  });

export const updateDataset = ({ token, datasetId, payload }) =>
  request(`/api/v1/datasets/${encodeURIComponent(datasetId)}`, {
    method: "PATCH",
    token,
    body: payload,
  });

export const deleteDataset = ({ token, datasetId }) =>
  request(`/api/v1/datasets/${encodeURIComponent(datasetId)}`, {
    method: "DELETE",
    token,
  });

export const fetchAdminPayoutBlockedSellers = ({ adminApiKey }) =>
  request(API_ENDPOINTS.admin.payoutBlockedSellers, {
    method: "GET",
    headers: getAdminApiKeyHeaders({ adminApiKey }),
  });

export const retryAdminBlockedPayouts = ({ adminApiKey }) =>
  request(API_ENDPOINTS.admin.payoutRetryBlocked, {
    method: "POST",
    headers: getAdminApiKeyHeaders({ adminApiKey }),
  });

export const retryAdminPayoutById = ({ adminApiKey, payoutId }) =>
  request(applyPathParams(API_ENDPOINTS.admin.payoutRetryById, { payoutId }), {
    method: "POST",
    headers: getAdminApiKeyHeaders({ adminApiKey }),
  });

export const fetchAdminUploadsQueueHealth = ({ adminApiKey }) =>
  request(API_ENDPOINTS.admin.uploadsQueueHealth, {
    method: "GET",
    headers: getAdminApiKeyHeaders({ adminApiKey }),
  });

export const fetchAdminUploadIngestionById = ({ adminApiKey, ingestionId }) =>
  request(applyPathParams(API_ENDPOINTS.admin.uploadsIngestionById, { ingestionId }), {
    method: "GET",
    headers: getAdminApiKeyHeaders({ adminApiKey }),
  });

export const requeueAdminStuckUploads = ({ adminApiKey }) =>
  request(API_ENDPOINTS.admin.uploadsRequeueStuck, {
    method: "POST",
    headers: getAdminApiKeyHeaders({ adminApiKey }),
  });

const appendJSONField = (formData, key, value) => {
  if (value === undefined || value === null) {
    return;
  }

  if (typeof value === "string") {
    let parsedValue;
    try {
      parsedValue = JSON.parse(value);
    } catch {
      throw new Error(`${key} must be valid JSON`);
    }

    formData.append(key, JSON.stringify(parsedValue));
    return;
  }

  if (typeof value === "object") {
    formData.append(key, JSON.stringify(value));
    return;
  }

  throw new Error(`${key} must be valid JSON`);
};

export const submitVendorApplication = async ({
  token,
  apiKey,
  apiKeyHeader,
  payload,
  logo,
}) => {
  if (!String(token || "").trim()) {
    throw new Error("Authorization header is required");
  }

  const hasFiles = Boolean(logo);

  if (!hasFiles) {
    return request(API_ENDPOINTS.vendors.applications, {
      method: "POST",
      token,
      headers: {
        ...getPlatformAuthHeaders({ token, apiKey, apiKeyHeader }),
      },
      body: payload,
    });
  }

  const formData = new FormData();

  Object.entries(payload || {}).forEach(([key, value]) => {
    if (key === "apiDefinition") {
      return;
    }

    if (value === undefined || value === null || value === "") {
      return;
    }

    if (typeof value === "boolean") {
      formData.append(key, value ? "true" : "false");
      return;
    }

    formData.append(key, String(value));
  });

  appendJSONField(formData, "apiDefinition", payload?.apiDefinition);

  if (logo) {
    formData.append("logo", logo);
  }

  return request(API_ENDPOINTS.vendors.applications, {
    method: "POST",
    token,
    headers: {
      ...getPlatformAuthHeaders({ token, apiKey, apiKeyHeader }),
    },
    body: formData,
  });
};

export const fetchVendorApplications = ({ token, limit, offset } = {}) => {
  const resolvedToken = String(token || "").trim();
  if (!resolvedToken) {
    throw new Error("Authorization header is required");
  }

  const params = new URLSearchParams();
  const parsedLimit = Number(limit);
  const parsedOffset = Number(offset);

  if (Number.isFinite(parsedLimit) && parsedLimit > 0) {
    params.set("limit", String(Math.floor(parsedLimit)));
  }

  if (Number.isFinite(parsedOffset) && parsedOffset >= 0) {
    params.set("offset", String(Math.floor(parsedOffset)));
  }

  const queryString = params.toString();
  const path = queryString
    ? `${API_ENDPOINTS.vendors.applications}?${queryString}`
    : API_ENDPOINTS.vendors.applications;

  return request(path, {
    method: "GET",
    token: resolvedToken,
  });
};

export const fetchVendorApiTemplate = () =>
  request(API_ENDPOINTS.market.vendorTemplate, { method: "GET" });

export const fetchAdminVendorApplications = ({ token, adminApiKey }) =>
  request(API_ENDPOINTS.vendorAdmin.applications, {
    method: "GET",
    token,
    headers: getAdminApiKeyHeaders({ adminApiKey }),
  });

export const reviewAdminVendorApplication = ({ token, adminApiKey, applicationId, decision, status, note }) =>
  request(applyPathParams(API_ENDPOINTS.vendorAdmin.applicationReview, { applicationId }), {
    method: "POST",
    token,
    headers: getAdminApiKeyHeaders({ adminApiKey }),
    body: {
      decision: decision || status,
      note,
    },
  });

const resolveDownloadFilename = (response, fallbackName) => {
  const disposition = response.headers.get("content-disposition") || "";
  const utfMatch = disposition.match(/filename\*=UTF-8''([^;]+)/i);
  if (utfMatch?.[1]) {
    return decodeURIComponent(utfMatch[1]);
  }

  const basicMatch = disposition.match(/filename="?([^";]+)"?/i);
  if (basicMatch?.[1]) {
    return basicMatch[1];
  }

  return fallbackName;
};

export const downloadAdminVendorApplicationDocument = async ({
  token,
  adminApiKey,
  applicationId,
  documentId,
}) => {
  const response = await fetch(
    buildApiUrl(
      applyPathParams(API_ENDPOINTS.vendorAdmin.applicationDocumentDownload, {
        applicationId,
        documentId,
      }),
    ),
    {
      method: "GET",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...getAdminApiKeyHeaders({ adminApiKey }),
      },
    },
  );

  if (!response.ok) {
    const fallbackMessage = `Request failed with status ${response.status}.`;
    const details = await extractErrorDetails(response, fallbackMessage);
    throw createHttpError({
      status: response.status,
      message: details.message,
      errorCode: details.errorCode,
    });
  }

  const blob = await response.blob();
  const filename = resolveDownloadFilename(
    response,
    `vendor-application-${applicationId}-document-${documentId}`,
  );

  return {
    blob,
    filename,
  };
};

export const registerVendorEndpoint = ({
  token,
  adminApiKey,
  apiKey,
  apiKeyHeader,
  vendorId,
  payload,
}) =>
  request(applyPathParams(API_ENDPOINTS.platformAdmin.vendorEndpoints, { vendorId }), {
    method: "POST",
    token,
    headers: {
      ...getPlatformAuthHeaders({ token: null, apiKey, apiKeyHeader }),
      ...getAdminApiKeyHeaders({ adminApiKey }),
    },
    body: payload,
  });

export const setVendorEndpointAllowed = ({
  token,
  adminApiKey,
  apiKey,
  apiKeyHeader,
  vendorId,
  endpointId,
  allowed,
}) =>
  request(
    applyPathParams(API_ENDPOINTS.platformAdmin.vendorEndpointAllowed, {
      vendorId,
      endpointId,
    }),
    {
      method: "PATCH",
      token,
      headers: {
        ...getPlatformAuthHeaders({ token: null, apiKey, apiKeyHeader }),
        ...getAdminApiKeyHeaders({ adminApiKey }),
      },
      body: { allowed },
    },
  );

export const setVendorEndpointPricing = ({
  token,
  adminApiKey,
  apiKey,
  apiKeyHeader,
  vendorId,
  endpointId,
  baseEgressCents,
  perByteNanos,
  isActive,
}) =>
  request(
    applyPathParams(API_ENDPOINTS.platformAdmin.vendorEndpointPricing, {
      vendorId,
      endpointId,
    }),
    {
      method: "PATCH",
      token,
      headers: {
        ...getPlatformAuthHeaders({ token: null, apiKey, apiKeyHeader }),
        ...getAdminApiKeyHeaders({ adminApiKey }),
      },
      body: {
        base_egress_cents: baseEgressCents,
        per_byte_nanos: perByteNanos,
        ...(typeof isActive === "boolean" ? { is_active: isActive } : {}),
      },
    },
  );

export const setUserVendorAccess = ({
  token,
  apiKey,
  apiKeyHeader,
  userId,
  vendorId,
  allowed,
}) =>
  request(
    applyPathParams(API_ENDPOINTS.platformAdmin.userVendorAccess, {
      userId,
      vendorId,
    }),
    {
      method: "PATCH",
      token,
      headers: getPlatformAuthHeaders({ token: null, apiKey, apiKeyHeader }),
      body: { allowed },
    },
  );

export const callVendorProxy = ({
  token,
  apiKey,
  apiKeyHeader,
  vendorId,
  proxyPath,
  method = "GET",
  body,
  headers,
}) => {
  const normalizedProxyPath = String(proxyPath || "")
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return request(applyPathParams(API_ENDPOINTS.vendors.proxy, { vendorId, proxyPath: normalizedProxyPath }), {
    method,
    token,
    headers: {
      ...getPlatformAuthHeaders({ token: null, apiKey, apiKeyHeader }),
      ...(headers || {}),
    },
    ...(body !== undefined ? { body } : {}),
  });
};

export const callVendorProxyWithMeta = async ({
  token,
  apiKey,
  apiKeyHeader,
  vendorId,
  proxyPath,
  method = "GET",
  body,
  headers,
}) => {
  const normalizedProxyPath = String(proxyPath || "")
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  const resolvedProxyUrl = buildApiUrl(
    applyPathParams(API_ENDPOINTS.vendors.proxy, { vendorId, proxyPath: normalizedProxyPath }),
  );

  console.log("[EndpointInvoke] Proxy request", {
    vendorId,
    proxyPath,
    normalizedProxyPath,
    method,
    resolvedProxyUrl,
  });

  const startedAt = Date.now();
  const response = await fetch(resolvedProxyUrl, {
    method,
    headers: {
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...getPlatformAuthHeaders({ token, apiKey, apiKeyHeader }),
      ...(headers || {}),
    },
    ...(body !== undefined
      ? {
          body: JSON.stringify(body),
        }
      : {}),
  });

  const durationMs = Date.now() - startedAt;
  const responseHeaders = Object.fromEntries(response.headers.entries());
  const contentType = response.headers.get("content-type") || "";

  const parseIntegerHeader = (headerName) => {
    const rawValue = response.headers.get(headerName);
    const numericValue = Number(rawValue);
    return Number.isFinite(numericValue) ? Math.max(0, Math.trunc(numericValue)) : null;
  };

  let responseBody = null;
  try {
    if (contentType.includes("application/json")) {
      responseBody = await response.json();
    } else {
      const text = await response.text();
      responseBody = text || null;
    }
  } catch {
    responseBody = null;
  }

  const bodyTextForSize = responseBody === null ? "" : typeof responseBody === "string" ? responseBody : JSON.stringify(responseBody);
  const inferredBodySizeBytes = new TextEncoder().encode(bodyTextForSize).length;
  const responseSizeBytes = parseIntegerHeader("content-length") ?? inferredBodySizeBytes;

  const creditsUsedFromBody =
    responseBody && typeof responseBody === "object"
      ? Number(
          responseBody.credits_used ??
            responseBody.creditsUsed ??
            responseBody.invocation?.credits_used ??
            responseBody.invocation?.creditsUsed,
        )
      : NaN;
  const creditsUsedFromHeaders =
    parseIntegerHeader("x-credits-used") ??
    parseIntegerHeader("x-credit-cost") ??
    parseIntegerHeader("x-invocation-credits-used");
  const creditsUsed = Number.isFinite(creditsUsedFromBody)
    ? Math.max(0, Math.trunc(creditsUsedFromBody))
    : (creditsUsedFromHeaders ?? 0);

  if (!response.ok) {
    const fallbackMessage = `Request failed with status ${response.status}.`;
    const errorDetails =
      responseBody && typeof responseBody === "object"
        ? {
            message: responseBody.message || responseBody.error || fallbackMessage,
            errorCode: responseBody.error_code || responseBody.code || null,
            fieldErrors: responseBody.field_errors || responseBody.fieldErrors || responseBody.errors || null,
          }
        : {
            message: String(responseBody || fallbackMessage),
            errorCode: null,
            fieldErrors: null,
          };

    const error = createHttpError({
      status: response.status,
      message: errorDetails.message,
      errorCode: errorDetails.errorCode,
      fieldErrors: errorDetails.fieldErrors,
    });
    error.responseHeaders = responseHeaders;
    error.responseBody = responseBody;
    error.durationMs = durationMs;
    throw error;
  }

  return {
    status: response.status,
    headers: responseHeaders,
    body: responseBody,
    durationMs,
    responseSizeBytes,
    creditsUsed,
  };
};

export const fetchInvocationHistory = ({ token, limit = 20, offset = 0, endpointId, vendorId } = {}) => {
  const params = new URLSearchParams();
  params.set("limit", String(limit));
  params.set("offset", String(offset));

  if (endpointId !== undefined && endpointId !== null && String(endpointId).trim() !== "") {
    params.set("endpoint_id", String(endpointId));
  }

  if (vendorId !== undefined && vendorId !== null && String(vendorId).trim() !== "") {
    params.set("vendor_id", String(vendorId));
  }

  return request(`${API_ENDPOINTS.invocations.list}?${params.toString()}`, {
    method: "GET",
    token,
  });
};

export const fetchInvocationById = ({ token, invocationId } = {}) =>
  request(applyPathParams(API_ENDPOINTS.invocations.byId, { invocationId }), {
    method: "GET",
    token,
  });

export const API_CALLS = {
  auth: {
    loginUser,
    loginWithGooglePopup,
    buildGoogleOAuthStartUrl,
    registerUser,
    validateAuthToken,
    refreshAccessToken,
    persistAccessToken,
    persistSessionTokens,
    clearSessionTokens,
  },
  system: {
    fetchHello,
    fetchHealthz,
    fetchDemoSuccess,
    fetchDownloadById,
  },
  market: {
    fetchMarketCategories,
    fetchMarketItems,
    fetchMarketEndpoints,
    fetchVendorEndpointCallTemplate,
    fetchMarketItemDetail,
    fetchV1MarketCategories,
    fetchV1MarketItems,
    fetchV1MarketItemDetail,
    fetchMarketItemSchema,
  },
  profiles: {
    getMyProfile,
    fetchPublicProfiles,
    fetchPublicProfile,
    fetchPublicProfileRating,
    submitProfileOnboarding,
    updateMyProfile,
  },
  datasets: {
    fetchPublicDataset,
    fetchPrivateDatasets,
    uploadDatasetFile,
    fetchDatasetUploadStatus,
    fetchDatasetReviews,
    fetchDatasetPreviewRows,
    fetchRelatedDatasets,
    authorizeDatasetDownload,
    createDatasetReview,
    upsertDatasetReview,
    updateDatasetVisibility,
    startDatasetTraining,
    updateDataset,
    deleteDataset,
  },
  credits: {
    fundCredits,
    fetchCreditsBalance,
    fetchCreditsPurchaseStatus,
  },
  payments: {
    createStripeWebhookEvent,
    createStripeSetupIntent,
    fetchStripePaymentMethods,
    setDefaultStripePaymentMethod,
    detachStripePaymentMethod,
    fetchApiBillingStatus,
    fetchPaymentsHistory,
  },
  invocations: {
    fetchInvocationHistory,
    fetchInvocationById,
  },
  payouts: {
    createStripeOnboardingLink,
    fetchStripeOnboardingStatus,
  },
  admin: {
    fetchAdminPayoutBlockedSellers,
    retryAdminBlockedPayouts,
    retryAdminPayoutById,
    fetchAdminUploadsQueueHealth,
    fetchAdminUploadIngestionById,
    requeueAdminStuckUploads,
  },
  platformAdmin: {
    registerVendorEndpoint,
    setVendorEndpointAllowed,
    setVendorEndpointPricing,
    setUserVendorAccess,
  },
  vendors: {
    callVendorProxy,
    callVendorProxyWithMeta,
    submitVendorApplication,
    fetchVendorApplications,
  },
  vendorAdmin: {
    fetchAdminVendorApplications,
    reviewAdminVendorApplication,
    downloadAdminVendorApplicationDocument,
  },
};
