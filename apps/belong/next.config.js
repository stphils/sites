// Define your production URL here
const SITE_URL = "https://belongchurch.au";

// Only use the asset prefix in production, not local development
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  reactStrictMode: true,

  // --- 1. Fix the "Sad" unstyled look ---
  // This forces the app to load CSS/JS from the original domain,
  // even when displayed on the other website.
  assetPrefix: isProd ? SITE_URL : undefined,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // --- PREVENT 404 ON /carols URL ---
  async rewrites() {
    return [
      {
        // When the app sees "/carols" in the browser URL bar,
        // load the homepage content ("/") instead of showing a 404 error.
        source: '/carols',
        destination: '/',
      },
    ];
  },
  // -----------------------------------------------
  // --- 2. Fix Security/Blocking issues (CORS) ---
  // This allows the Main Site to access the fonts and scripts
  // hosted on this Carols app.
  async headers() {
    return [
      {
        source: "/_next/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
        ],
      },
      {
        source: "/public/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },
};
