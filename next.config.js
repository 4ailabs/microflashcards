/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configura Railway para usar exportación estática
  output: 'standalone',
}

module.exports = nextConfig