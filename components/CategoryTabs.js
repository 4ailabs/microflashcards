export default function CategoryTabs({ selectedCategory, onChange, counts }) {
  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'bacterias', label: 'Bacterias' },
    { id: 'virusADN', label: 'Virus ADN' },
    { id: 'virusARN', label: 'Virus ARN' },
    { id: 'virus', label: 'Todos los Virus' },
    { id: 'parasitos', label: 'Parásitos' },
    { id: 'hongos', label: 'Hongos' }
  ];

  return (
    <div className="category-tabs">
      {categories.map(category => (
        <button
          key={category.id}
          className={`tab ${selectedCategory === category.id ? 'active' : ''}`}
          onClick={() => onChange(category.id)}
        >
          {category.label}
          {counts && counts[category.id] && ` (${counts[category.id]})`}
        </button>
      ))}
    </div>
  );
}