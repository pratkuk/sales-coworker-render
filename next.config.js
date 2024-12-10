/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PORT: process.env.PORT || 3000
  },
  experimental: {
    serverComponentsExternalPackages: [], // empty array rather than undefined
  },
}

module.exports = nextConfig