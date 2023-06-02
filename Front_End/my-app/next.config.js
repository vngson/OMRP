/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
 
      },
      {
        protocol: 'https',
        hostname: 'sagift.vn',
 
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
 
      },
      {
        protocol: 'https',
        hostname: 'sagift.vn',
 
      },
      {
        protocol: 'https',
        hostname: 'project-ec-tuankhanh.onrender.com',
 
      },
      {
        protocol: 'http',
        hostname: 'localhost',
 
      },
      {
        protocol: 'https',
        hostname: '24hstore.vn',
 
      },
    ],
  },
}

module.exports = nextConfig
