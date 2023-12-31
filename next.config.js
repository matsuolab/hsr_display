/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("bufferutil", "utf-8-validate");
    }

    return config;
  },
  compiler: {
    styledComponents: true
  }
};

module.exports = nextConfig;
