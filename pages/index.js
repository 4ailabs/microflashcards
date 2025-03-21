import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getAllMicro } from '../data';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [microItems, setMicroItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('bacterias');

  // Manejo de errores global
  useEffect(() => {
    const handleError = (event) => {
      console.error('Error capturado en window.onerror:', event);
      setError('Se ha producido un error en la aplicación');
    };

    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  // Cargar datos con manejo de errores
  useEffect(() => {
    try {
      const allItems = getAllMicro();
      setMicroItems(allItems);
      setLoading(false);
    } catch (e) {
      console.error('Error al cargar datos:', e);
      setError('Error al cargar datos');
      setLoading(false);
    }
  }, []);

  const filterByCategory = (category) => {
    setSelectedCategory(category);
  };

  // Renderizar mensaje de error si hay uno
  if (error) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Error en la aplicación</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{ 
              margin: '20px', 
              padding: '10px 20px', 
              background: '#3b82f6', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px' 
            }}
          >
            Recargar
          </button>
        </div>
      </div>
    );
  }

  // Renderizar pantalla de carga
  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Cargando MicroFlashcards...</h2>
        </div>
      </div>
    );
  }

  // Filtrar los elementos según la categoría seleccionada
  const getCategoryPrefix = (category) => {
    const categoryMap = {
      'bacterias': 'A',
      'virusADN': 'B',
      'virusARN': 'B',
      'parasitos': 'C',
      'hongos': 'D',
      'todos': ''
    };
    return categoryMap[category] || '';
  };

  const filteredItems = selectedCategory === 'todos' 
    ? microItems 
    : microItems.filter(item => {
        const prefix = getCategoryPrefix(selectedCategory);
        
        if (selectedCategory === 'virusADN') {
          return item.id.startsWith('B') && parseInt(item.id.substring(1)) <= 18;
        }
        
        if (selectedCategory === 'virusARN') {
          return item.id.startsWith('B') && parseInt(item.id.substring(1)) > 18;
        }
        
        return item.id.startsWith(prefix);
      });

  return (
    <div className="container">
      <Head>
        <title>MicroFlashcards</title>
        <meta name="description" content="Flashcards de microorganismos para estudio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">MicroFlashcards</h1>
        
        {/* Versión simplificada de CategoryTabs */}
        <div className="category-tabs">
          {['todos', 'bacterias', 'virusADN', 'virusARN', 'parasitos', 'hongos'].map(category => (
            <button
              key={category}
              className={`tab ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => filterByCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Lista simple de elementos */}
        <div className="results-count">
          Mostrando {filteredItems.length} resultados
        </div>
        
        <div className="grid-container">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="grid-card"
              style={{ 
                transition: "transform 0.2s, box-shadow 0.2s"
              }}
            >
              <div className={`grid-header ${getCategoryPrefix(selectedCategory) === 'A' ? 'bacteria-header' : getCategoryPrefix(selectedCategory) === 'B' ? 'virus-adn-header' : getCategoryPrefix(selectedCategory) === 'C' ? 'parasito-header' : 'hongo-header'}`}>
                <div className="grid-title-row">
                  <span className="grid-title">{item.nombre}</span>
                  <span className="grid-id">{item.id}</span>
                </div>
                {item.nombreCientifico && (
                  <div className="grid-subtitle">{item.nombreCientifico}</div>
                )}
              </div>
              <div className="grid-body">
                <div className="grid-type">{item.tipo}</div>
                {item.descripcion && (
                  <div className="grid-description">{item.descripcion.slice(0, 100)}...</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}