import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
// Importación condicional para solucionar problemas con SSR
const IconRenderer = dynamic(() => import('./IconRenderer'), { ssr: false });

export default function MicroCard({ item, onNext, onPrev, isFirst, isLast, currentIndex, totalItems }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es un dispositivo móvil
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768 || 
                            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };
    
    // Verificar al cargar
    checkMobile();
    
    // Verificar al cambiar el tamaño de la ventana
    window.addEventListener('resize', checkMobile);
    
    // Verificar si estamos en un entorno de producción con la variable de entorno
    if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_MOBILE_FIX === 'true') {
      setIsMobile(true); // Forzar modo móvil en producción
    }
    
    // Verificar si es un dispositivo iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIOS) {
      document.documentElement.classList.add('ios-device');
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Resetear el estado de volteo cuando cambia el item
  useEffect(() => {
    setIsFlipped(false);
  }, [item]);

  if (!item || !item.id) {
    return <div className="no-card">No hay datos disponibles</div>;
  }

  const getCategoryClass = (id) => {
    if (!id) return "bacteria-header";
    
    const prefix = id.charAt(0);
    const num = parseInt(id.substring(1));
    
    switch (prefix) {
      case "A": return "bacteria-header";
      case "B": return num <= 18 ? "virus-adn-header" : "virus-arn-header";
      case "C": return "parasito-header";
      case "D": return "hongo-header";
      default: return "bacteria-header";
    }
  };

  return (
    <div className="card-container">
      <div 
        className={`micro-card ${isFlipped ? 'flipped' : ''} ${isMobile ? 'mobile' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          setIsFlipped(!isFlipped);
        }}
      >
        <div className="card-inner">
          {/* Frente de la tarjeta */}
          <div className="card-front">
            <div className="card-header">
              <div className={`card-title-area ${getCategoryClass(item.id)}`}>
                <h2 className="card-title">{item.nombre}</h2>
                <p className="card-subtitle">{item.nombreCientifico}</p>
              </div>
              <div className="card-id">{item.id}</div>
              <button 
                className="flip-button"
                onClick={(e) => {
                  e.stopPropagation(); 
                  setIsFlipped(!isFlipped);
                }}
                aria-label="Voltear tarjeta"
              >
                ↻
              </button>
            </div>
            
            <div className="card-section">
              <h3 className="section-title">{item.tipo}</h3>
              <div className="description-container">
                <p>{item.descripcion}</p>
                <div className="illustration">
                  <IconRenderer item={item} />
                </div>
              </div>
            </div>
            
            <div className="card-section">
              <h3 className="section-title">Código patógeno</h3>
              <div className="pathogen-list">
                {item.codigoPatogeno}
              </div>
            </div>
          </div>
          
          {/* Reverso de la tarjeta */}
          <div className="card-back">
            <button 
              className="flip-button back-flip-button"
              onClick={(e) => {
                e.stopPropagation(); 
                setIsFlipped(false);
              }}
              aria-label="Voltear tarjeta"
            >
              ↻
            </button>
            
            <div className="card-section">
              <h3 className="section-title">Conflicto base</h3>
              <p>{item.conflictoBase}</p>
            </div>
            
            <div className="card-section">
              <h3 className="section-title">Notas</h3>
              <p>{item.notas}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="navigation">
        <button 
          onClick={onPrev}
          disabled={isFirst}
          className={`nav-button ${isFirst ? 'disabled' : ''}`}
        >
          Anterior
        </button>
        <span className="pagination-info">
          {currentIndex + 1} de {totalItems}
        </span>
        <button 
          onClick={onNext}
          disabled={isLast}
          className={`nav-button ${isLast ? 'disabled' : ''}`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
