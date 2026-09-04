import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */


  trailingSlash: true,
  allowedDevOrigins: [
    '185.182.9.176',
    'localhost:9008',
    'localhost:3000',
    '*.proiso.pe',
    'proiso.pe',
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
