/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites() {
    return [
      {
        source: '/fruit',
        destination: '/api/fruit',
      },
    ]
  },
}

module.exports = nextConfig
