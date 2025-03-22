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
  },
  // Configuración para mejorar la compatibilidad con dispositivos móviles
  compiler: {
    // Eliminar console.logs en producción
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Configuración de encabezados HTTP para mejorar la compatibilidad
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-UA-Compatible',
            value: 'IE=edge,chrome=1',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          }
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
  // Variables de entorno públicas
  env: {
    NEXT_PUBLIC_MOBILE_FIX: process.env.NEXT_PUBLIC_MOBILE_FIX || 'false',
  }
}

module.exports = nextConfig
