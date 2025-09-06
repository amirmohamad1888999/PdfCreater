import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Next.js config property
  trailingSlash: true, // Next.js config property
  output: 'export', // Next.js config property
  images: {
    unoptimized: true,
  },
  // Ensure that next-pwa is properly configured
  ...withPWA({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
  }),
};

export default nextConfig;

