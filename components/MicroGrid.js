import { motion } from 'framer-motion';

export default function MicroGrid({ items, activeIndex, onSelectItem }) {
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
    <div className="grid-container">
      {items.map((item, index) => (
        <motion.div 
          key={item.id}
          className={`grid-card ${index === activeIndex ? 'active' : ''}`}
          whileHover={{ 
            scale: 1.03,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
          }}
          onClick={() => onSelectItem(index)}
        >
          <div className={`grid-header ${getCategoryClass(item.id)}`}>
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
              <div className="grid-description">{item.descripcion}</div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}