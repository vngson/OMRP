/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['drive.google.com'],
  },
}

module.exports = nextConfig
