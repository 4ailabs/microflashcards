import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getAllMicro } from '../data';
import MicroCard from '../components/MicroCard';
import MicroGrid from '../components/MicroGrid';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [microItems, setMicroItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('bacterias');
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewType, setViewType] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

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

  // Función para filtrar por búsqueda
  const filterBySearch = (item, term) => {
    if (!term.trim()) return true;
    
    const searchLower = term.toLowerCase();
    return (
      (item.nombre && item.nombre.toLowerCase().includes(searchLower)) ||
      (item.descripcion && item.descripcion.toLowerCase().includes(searchLower)) ||
      (item.nombreCientifico && item.nombreCientifico.toLowerCase().includes(searchLower)) ||
      (item.tipo && item.tipo.toLowerCase().includes(searchLower))
    );
  };

  // Aplicar filtros por categoría y búsqueda
  const filteredByCategory = selectedCategory === 'todos' 
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
      
  // Aplicar filtro de búsqueda
  const filteredItems = searchTerm
    ? filteredByCategory.filter(item => filterBySearch(item, searchTerm))
    : filteredByCategory;

  return (
    <div className="container">
      <Head>
        <title>Microbioenergetica Flashcards</title>
        <meta name="description" content="Flashcards de microorganismos para estudio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">Microbioenergetica Flashcards</h1>
        
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
        
        {/* Barra de búsqueda */}
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
        
        {/* Selector de vista */}
        <div className="view-selector">
          <div className="view-buttons">
            <button 
              className={`view-button left ${viewType === 'card' ? 'active' : ''}`}
              onClick={() => setViewType('card')}
            >
              Tarjeta
            </button>
            <button 
              className={`view-button right ${viewType === 'grid' ? 'active' : ''}`}
              onClick={() => setViewType('grid')}
            >
              Cuadrícula
            </button>
          </div>
          
          <div className="results-count">
            Mostrando {filteredItems.length} resultados
          </div>
        </div>
        
        {filteredItems.length === 0 ? (
          <div className="no-results">
            <p>No se encontraron resultados para tu búsqueda.</p>
          </div>
        ) : viewType === 'card' ? (
          <MicroCard 
            item={filteredItems[activeIndex]}
            onNext={() => {
              if (activeIndex < filteredItems.length - 1) {
                setActiveIndex(activeIndex + 1);
              }
            }}
            onPrev={() => {
              if (activeIndex > 0) {
                setActiveIndex(activeIndex - 1);
              }
            }}
            isFirst={activeIndex === 0}
            isLast={activeIndex === filteredItems.length - 1}
            currentIndex={activeIndex}
            totalItems={filteredItems.length}
          />
        ) : (
          <MicroGrid 
            items={filteredItems}
            activeIndex={activeIndex}
            onSelectItem={(index) => {
              setActiveIndex(index);
              setViewType('card');
            }}
          />
        )}
        
        <footer className="footer">
          <p>Dr. Miguel Ojeda Rios</p>
        </footer>
      </main>
    </div>
  );
}