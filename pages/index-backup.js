{/* Backup del index original */}
import { useState, useEffect } from 'react';
import Head from 'next/head';
import MicroCard from '../components/MicroCard';
import MicroGrid from '../components/MicroGrid';
import SearchBar from '../components/SearchBar';
import CategoryTabs from '../components/CategoryTabs';
import { getAllMicro } from '../data';

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewType, setViewType] = useState("card");
  const [selectedCategory, setSelectedCategory] = useState("bacterias");
  const [microItems, setMicroItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  // Cargar todos los microorganismos al inicio
  useEffect(() => {
    const allItems = getAllMicro();
    setMicroItems(allItems);
    
    // Inicializar con bacterias
    const initialItems = allItems.filter(item => item.id.startsWith('A'));
    setFilteredItems(initialItems);
  }, []);

  // Filtrar cuando cambia la categoría o el término de búsqueda
  useEffect(() => {
    filterItems();
  }, [selectedCategory, searchTerm, microItems]);

  const filterItems = () => {
    if (!microItems.length) return;
    
    let filtered = [...microItems];
    
    // Filtrar por categoría
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(item => {
        if (selectedCategory === 'virus') {
          return item.id.startsWith('B');
        }
        
        const categoryMap = {
          'bacterias': 'A',
          'virusADN': 'B',
          'virusARN': 'B',
          'parasitos': 'C',
          'hongos': 'D'
        };
        
        if (selectedCategory === 'virusADN') {
          return item.id.startsWith('B') && parseInt(item.id.substring(1)) <= 18;
        }
        
        if (selectedCategory === 'virusARN') {
          return item.id.startsWith('B') && parseInt(item.id.substring(1)) > 18;
        }
        
        return item.id.startsWith(categoryMap[selectedCategory]);
      });
    }
    
    // Filtrar por término de búsqueda
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(item => 
        item.nombre.toLowerCase().includes(term) ||
        (item.nombreCientifico && item.nombreCientifico.toLowerCase().includes(term))
      );
    }
    
    setFilteredItems(filtered);
    
    // Resetear índice al filtrar
    if (activeIndex >= filtered.length) {
      setActiveIndex(0);
    }
  };

  // Cambio de categoría
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setActiveIndex(0);
  };

  // Contar items por categoría
  const getCounts = () => {
    if (!microItems.length) return {};
    
    return {
      bacterias: microItems.filter(i => i.id.startsWith('A')).length,
      virusADN: microItems.filter(i => i.id.startsWith('B') && parseInt(i.id.substring(1)) <= 18).length,
      virusARN: microItems.filter(i => i.id.startsWith('B') && parseInt(i.id.substring(1)) > 18).length,
      virus: microItems.filter(i => i.id.startsWith('B')).length,
      parasitos: microItems.filter(i => i.id.startsWith('C')).length,
      hongos: microItems.filter(i => i.id.startsWith('D')).length,
      todos: microItems.length
    };
  };

  return (
    <div className="container">
      <Head>
        <title>MicroFlashcards</title>
        <meta name="description" content="Flashcards de microorganismos para estudio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">MicroFlashcards</h1>
        
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
        
        <CategoryTabs 
          selectedCategory={selectedCategory} 
          onChange={handleCategoryChange} 
          counts={getCounts()}
        />
        
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
            <button className="clear-button" onClick={() => setSearchTerm('')}>
              Limpiar búsqueda
            </button>
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
      </main>
    </div>
  );
}