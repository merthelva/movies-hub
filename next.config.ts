import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const apiOrigin = process.env.NEXT_PUBLIC_API_BASE_URL
  ? new URL(process.env.NEXT_PUBLIC_API_BASE_URL).origin
  : "";
const isDev = process.env.NODE_ENV !== "production";

const securityHeaders = [
  {
    // Restricts which origins can load scripts, styles, images, and other resources,
    // reducing XSS attack surface.
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js requires 'unsafe-inline' for its runtime styles; nonces are the stricter alternative
      "style-src 'self' 'unsafe-inline'",
      // 'unsafe-eval' only needed by Next.js dev mode (HMR/fast refresh); stripped in production
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
      "img-src 'self' data: https://image.tmdb.org",
      "font-src 'self'",
      `connect-src 'self'${apiOrigin ? ` ${apiOrigin}` : ""}`,
      // Allows embedding YouTube trailers in an <iframe> on movie detail pages.
      "frame-src https://www.youtube.com",
      "frame-ancestors 'none'",
    ].join("; "),
  },
  {
    // Prevents browsers from MIME-sniffing a response away from the declared Content-Type,
    // blocking drive-by-download attacks that exploit type confusion.
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // Blocks the page from being embedded in an <iframe>, defending against clickjacking.
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    // Instructs browsers to use HTTPS exclusively for one year and apply the policy to
    // all subdomains, preventing protocol-downgrade and cookie-hijacking attacks.
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  {
    // Limits how much referrer info leaks to other origins on outbound requests/navigations.
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    // Explicitly denies access to sensitive browser APIs this app doesn't use.
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
