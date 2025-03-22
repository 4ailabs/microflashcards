// Este es un ejemplo de componente de código personalizado para Framer
// Copia y pega este código en un componente de código en Framer

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MicroFlashcards(props) {
  const {
    apiUrl = "https://microflashcards.vercel.app/api/flashcards",
    category = "todos",
    backgroundColor = "#111827",
    textColor = "#f3f4f6",
    accentColor = "#3b82f6",
    width = 800,
    height = 500
  } = props;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Cargar datos de la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${apiUrl}?category=${category}`
        );
        
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {
          setFlashcards(result.data);
        } else {
          throw new Error(result.error || "Error desconocido");
        }
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, category]);

  // Manejar navegación
  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 300);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
      }, 300);
    }
  };

  // Renderizar estado de carga
  if (loading) {
    return (
      <div style={{ 
        width, 
        height, 
        backgroundColor, 
        color: textColor,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px"
      }}>
        <p>Cargando flashcards...</p>
      </div>
    );
  }

  // Renderizar error
  if (error) {
    return (
      <div style={{ 
        width, 
        height, 
        backgroundColor, 
        color: textColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
        padding: "20px"
      }}>
        <h3>Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  // Renderizar sin datos
  if (flashcards.length === 0) {
    return (
      <div style={{ 
        width, 
        height, 
        backgroundColor, 
        color: textColor,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px"
      }}>
        <p>No se encontraron flashcards</p>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];

  // Obtener color según categoría
  const getCategoryColor = (id) => {
    if (!id) return accentColor;
    
    const prefix = id.charAt(0);
    const num = parseInt(id.substring(1));
    
    switch (prefix) {
      case "A": return "#3b82f6"; // Bacterias
      case "B": return num <= 18 ? "#f59e0b" : "#ef4444"; // Virus ADN/ARN
      case "C": return "#10b981"; // Parásitos
      case "D": return "#14b8a6"; // Hongos
      default: return accentColor;
    }
  };

  const cardColor = getCategoryColor(currentCard.id);

  return (
    <div style={{ 
      width, 
      height, 
      backgroundColor, 
      color: textColor,
      borderRadius: "8px",
      overflow: "hidden",
      position: "relative",
      fontFamily: "sans-serif"
    }}>
      {/* Tarjeta */}
      <div 
        style={{ 
          width: "100%", 
          height: "calc(100% - 60px)",
          perspective: "1500px",
          cursor: "pointer"
        }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Frente */}
          <div style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            backgroundColor: "#1f2937",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden"
          }}>
            <div style={{
              backgroundColor: cardColor,
              padding: "16px",
              color: "white",
              display: "flex"
            }}>
              <div style={{ flexGrow: 1 }}>
                <h2 style={{ margin: 0 }}>{currentCard.nombre}</h2>
                <p style={{ fontStyle: "italic", margin: "4px 0 0 0" }}>
                  {currentCard.nombreCientifico}
                </p>
              </div>
              <div style={{
                width: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#1f2937",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.5rem"
              }}>
                {currentCard.id}
              </div>
            </div>
            
            <div style={{ padding: "16px" }}>
              <h3>Tipo</h3>
              <p>{currentCard.tipo}</p>
              <h3>Descripción</h3>
              <p>{currentCard.descripcion}</p>
              <h3>Código patógeno</h3>
              <p style={{ whiteSpace: "pre-line" }}>{currentCard.codigoPatogeno}</p>
            </div>
          </div>
          
          {/* Reverso */}
          <div style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            backgroundColor: "#1f2937",
            borderRadius: "8px",
            transform: "rotateY(180deg)",
            padding: "16px",
            overflow: "auto"
          }}>
            <h3>Conflicto base</h3>
            <p>{currentCard.conflictoBase}</p>
            <h3>Notas</h3>
            <p>{currentCard.notas}</p>
          </div>
        </motion.div>
      </div>
      
      {/* Navegación */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 16px",
        height: "60px"
      }}>
        <button 
          onClick={handlePrev}
          disabled={currentIndex === 0}
          style={{
            padding: "8px 16px",
            backgroundColor: currentIndex === 0 ? "#374151" : cardColor,
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: currentIndex === 0 ? "not-allowed" : "pointer",
            fontWeight: "500"
          }}
        >
          Anterior
        </button>
        
        <span style={{ color: textColor }}>
          {currentIndex + 1} de {flashcards.length}
        </span>
        
        <button 
          onClick={handleNext}
          disabled={currentIndex === flashcards.length - 1}
          style={{
            padding: "8px 16px",
            backgroundColor: currentIndex === flashcards.length - 1 ? "#374151" : cardColor,
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: currentIndex === flashcards.length - 1 ? "not-allowed" : "pointer",
            fontWeight: "500"
          }}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
