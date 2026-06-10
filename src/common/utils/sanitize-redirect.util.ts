const sanitizeRedirect = (value: unknown): string | undefined => {
  if (typeof value !== "string") return undefined;
  // Reject protocol-relative URLs (//evil.com) and backslash tricks (/\evil.com)
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) {
    return undefined;
  }
  return value;
};

export { sanitizeRedirect };
