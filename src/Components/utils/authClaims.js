export const parseJwtClaims = (token) => {
  if (!token || typeof token !== "string") {
    return null;
  }

  const parts = token.split(".");
  if (parts.length < 2) {
    return null;
  }

  const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");

  try {
    const decoded = atob(base64);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
};

export const hasAdminAccess = (token) => {
  const claims = parseJwtClaims(token);
  if (!claims) {
    return false;
  }

  const explicitFlag = claims.is_admin === true || claims.admin === true;
  if (explicitFlag) {
    return true;
  }

  const roleCandidates = [
    ...(Array.isArray(claims.roles) ? claims.roles : []),
    ...(Array.isArray(claims.role) ? claims.role : []),
    claims.role,
    claims.user_role,
    claims.scope,
  ]
    .flat()
    .filter(Boolean)
    .map((value) => String(value).toLowerCase());

  return roleCandidates.some((value) =>
    ["admin", "platform_admin", "super_admin", "vendor_admin"].some((adminRole) => value.includes(adminRole)),
  );
};
