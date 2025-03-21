export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Buscar microorganismo..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <button
          className="clear-button"
          onClick={() => setSearchTerm('')}
        >
          ×
        </button>
      )}
    </div>
  );
}