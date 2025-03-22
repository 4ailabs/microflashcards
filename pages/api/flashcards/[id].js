import { getAllMicro } from '../../../data';

export default function handler(req, res) {
  try {
    const { id } = req.query;
    const allItems = getAllMicro();
    const item = allItems.find(item => item.id === id);
    
    if (!item) {
      return res.status(404).json({ 
        success: false, 
        error: 'Flashcard no encontrada' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      data: item 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Error al obtener los datos' 
    });
  }
}
