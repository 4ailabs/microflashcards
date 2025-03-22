import { getAllMicro } from '../../data';

export default function handler(req, res) {
  try {
    // Obtener parámetros de consulta
    const { category, search } = req.query;
    
    // Obtener todos los datos
    const allItems = getAllMicro();
    
    // Filtrar por categoría si se proporciona
    let filteredItems = allItems;
    if (category && category !== 'todos') {
      const getCategoryPrefix = (cat) => {
        const categoryMap = {
          'bacterias': 'A',
          'virusADN': 'B',
          'virusARN': 'B',
          'parasitos': 'C',
          'hongos': 'D'
        };
        return categoryMap[cat] || '';
      };
      
      const prefix = getCategoryPrefix(category);
      
      if (category === 'virusADN') {
        filteredItems = allItems.filter(item => 
          item.id.startsWith('B') && parseInt(item.id.substring(1)) <= 18
        );
      } else if (category === 'virusARN') {
        filteredItems = allItems.filter(item => 
          item.id.startsWith('B') && parseInt(item.id.substring(1)) > 18
        );
      } else {
        filteredItems = allItems.filter(item => item.id.startsWith(prefix));
      }
    }
    
    // Filtrar por búsqueda si se proporciona
    if (search) {
      const searchLower = search.toLowerCase();
      filteredItems = filteredItems.filter(item => 
        (item.nombre && item.nombre.toLowerCase().includes(searchLower)) ||
        (item.descripcion && item.descripcion.toLowerCase().includes(searchLower)) ||
        (item.nombreCientifico && item.nombreCientifico.toLowerCase().includes(searchLower)) ||
        (item.tipo && item.tipo.toLowerCase().includes(searchLower))
      );
    }
    
    // Devolver los resultados
    res.status(200).json({ 
      success: true, 
      count: filteredItems.length,
      data: filteredItems 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Error al obtener los datos' 
    });
  }
}
