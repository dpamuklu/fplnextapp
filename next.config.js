/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/standings",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
