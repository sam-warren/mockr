import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  // Handle multi-tenant domains
  async rewrites() {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'mockr.io';

    if (isDevelopment) {
      // For development, use a simpler configuration
      return [
        // Special handling for auth callbacks to ensure cookies are preserved
        {
          source: '/api/auth/:path*',
          destination: '/api/auth/:path*',
        },
        // Handle app routes on app.localhost
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'app.localhost:3000',
            },
          ],
          destination: '/app/:path*',
        },
        // Handle home routes on localhost
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'localhost:3000',
            },
          ],
          destination: '/home/:path*',
        },
      ];
    } else {
      // For production
      return [
        // Special handling for auth callbacks to ensure cookies are preserved
        {
          source: '/api/auth/:path*',
          destination: '/api/auth/:path*',
        },
        // Handle app routes on app subdomain
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: `app.${rootDomain}`,
            },
          ],
          destination: '/app/:path*',
        },
        // Handle home routes on www subdomain
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: `www.${rootDomain}`,
            },
          ],
          destination: '/home/:path*',
        },
        // Handle home routes on root domain
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: rootDomain,
            },
          ],
          destination: '/home/:path*',
        },
      ];
    }
  },
  // Configure images to allow GitHub avatar URLs
  images: {
    remotePatterns: [
      { hostname: 'avatars.githubusercontent.com' },
    ],
  },
};

export default nextConfig;
