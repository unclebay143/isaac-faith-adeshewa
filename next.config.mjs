/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
  images: {
    domains: ["cdn.hashnode.com"],
    minimumCacheTTL: 1500000,
  },
};

export default nextConfig;
