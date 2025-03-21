/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false, // Desactivado para evitar problemas de minificación
  // Este tipo de salida es mejor para despliegues de Vercel en Next.js 12
  // Para exportación estática, se usará el comando 'next export'
  trailingSlash: true, // Añadir trailing slash para mejor compatibilidad
  images: {
    unoptimized: true // Necesario para exportación estática
  }
}

module.exports = nextConfig