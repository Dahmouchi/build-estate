/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
 async headers() {
    return [
      {
        // Apply to all API routes (you can restrict to just /api/reservations if you want)
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // ❗ Replace "*" with your domain in production
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,POST,PUT,DELETE" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" },
        ],
      },
    ]
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.resolve.alias.canvas = false;
    return config
  },
  experimental: {
    serverActions: {
       bodySizeLimit: '50mb', // or '50mb' or whatever size you need
    },
  },
  async rewrites() {
    return [
      {
        source: '/api/google/:path*',
        destination: 'https://maps.googleapis.com/maps/api/place/:path*',
      }
    ];
  },
  // ... any other existing config
}

export default nextConfig