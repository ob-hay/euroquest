import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.euroqst.com',
        port: '',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'euroqst.com',
        port: '',
        pathname: '/assets/**',
      },
    ],
  },
};

export default nextConfig;
