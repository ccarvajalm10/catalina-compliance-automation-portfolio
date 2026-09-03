/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The app reads markdown + JSON from data/ at runtime via fs. Tell Next's file
  // tracer to bundle those files with the serverless functions that need them.
  outputFileTracingIncludes: {
    "/": ["./data/**/*"],
    "/tool": ["./data/**/*"],
    "/case-study": ["./data/**/*"],
    "/api/analyze": ["./data/**/*"],
  },
};

export default nextConfig;
