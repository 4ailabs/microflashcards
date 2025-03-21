/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Cambiado a false para evitar renders dobles
  swcMinify: true,
  // Configura Railway para usar exportación estática
  output: 'standalone',
  // Solucionar problemas de CORS
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
  // Solucionar problemas con CSS
  compiler: {
    // Removes the reactStrictMode warning when using styled-jsx
    styledComponents: true,
  },
}

module.exports = nextConfig