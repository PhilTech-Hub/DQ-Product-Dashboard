import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.dummyjson.com', // allow subdomains like cdn., i., etc.
        pathname: '**',
      },
    ],
    domains: ['dummyjson.com'], // this is still useful as fallback
  },
};

export default nextConfig;
