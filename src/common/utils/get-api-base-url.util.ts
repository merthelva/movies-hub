// Server-only: read at runtime, never shipped to the browser (no NEXT_PUBLIC_ prefix).
// Resolved lazily so `next build` doesn't fail when the variable is absent at build time.
const getApiBaseUrl = (): string => {
  const apiBaseUrl = process.env.API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("API_BASE_URL environment variable is not set");
  }

  return apiBaseUrl;
};

export { getApiBaseUrl };
