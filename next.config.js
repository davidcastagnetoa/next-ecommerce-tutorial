// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig

const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");

const nextConfig = {
  webpack: (config, { isServer }) => {
    // Fix for TextEncoder issue
    if (isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        util: require.resolve("util/"),
      };
    }

    return config;
  },
};

module.exports = withPlugins([[optimizedImages, {}]], nextConfig);

