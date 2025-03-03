/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has TypeScript errors.
    ignoreBuildErrors: true,
  },
  env: {
    // Make sure environment variables are available at build time
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_PRO_PRICE_ID: process.env.STRIPE_PRO_PRICE_ID,
    STRIPE_ENTERPRISE_PRICE_ID: process.env.STRIPE_ENTERPRISE_PRICE_ID,
  },
  // Set output to 'standalone' to optimize for serverless deployment
  output: 'standalone',
  // Disable static optimization for problematic pages
  experimental: {
    // This helps with CSS processing issues
    optimizeCss: false,
  },
  // Configure page generation
  generateBuildId: async () => {
    // You can set a custom build ID here if needed
    return 'mockr-build-' + Date.now();
  },
  // Disable static optimization completely
  staticPageGenerationTimeout: 0,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig; 