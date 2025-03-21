/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false, // Desactivado para evitar problemas de minificación
  output: 'export', // Cambiado a export para generar archivos estáticos
  trailingSlash: true, // Añadir trailing slash para mejor compatibilidad
  images: {
    unoptimized: true // Necesario para exportación estática
  }
}

module.exports = nextConfig