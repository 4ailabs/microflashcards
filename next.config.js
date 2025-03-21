/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false, // Desactivado para evitar problemas de minificación
  trailingSlash: true, // Añadir trailing slash para mejor compatibilidad
  images: {
    unoptimized: true // Necesario para exportación estática
  },
  // Configuración específica para exportación estática (Railway)
  output: process.env.RAILWAY === 'true' ? 'export' : undefined,
  // Configuración para exportación estática
  exportPathMap: async function () {
    return {
      '/': { page: '/' }
    }
  }
}

module.exports = nextConfig