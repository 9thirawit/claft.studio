import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  async headers() {
  return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          // สำหรับ iOS Safari
          {
            key: 'apple-mobile-web-app-capable',
            value: 'yes',
          },
          {
            key: 'apple-mobile-web-app-status-bar-style',
            value: 'black-translucent',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
