import '../styles/globals.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  // Inicializar el tema al cargar la aplicación
  useEffect(() => {
    // Comprobar si hay tema guardado
    const savedTheme = localStorage.getItem('theme');
    // Aplicar tema guardado o comprobar preferencia del sistema
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);
  
  return <Component {...pageProps} />;
}

export default MyApp;