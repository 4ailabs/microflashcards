import { NextResponse } from 'next/server';

export function middleware(request) {
  // Obtener la respuesta
  const response = NextResponse.next();

  // Añadir los encabezados CORS
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.headers.set(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  return response;
}

// Configurar las rutas a las que se aplicará el middleware
export const config = {
  matcher: '/api/:path*',
};
