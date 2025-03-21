import { useState } from 'react';
import { motion } from 'framer-motion';
import IconRenderer from './IconRenderer';

export default function MicroCard({ item, onNext, onPrev, isFirst, isLast, currentIndex, totalItems }) {
  const [isFlipped, setIsFlipped] = useState(false);

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
        className={`micro-card ${isFlipped ? 'flipped' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
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