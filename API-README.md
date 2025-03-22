# API de MicroFlashcards

Este documento explica cómo usar la API de MicroFlashcards e integrarla con Framer.

## Endpoints de la API

La API proporciona los siguientes endpoints:

### 1. Obtener todas las flashcards

```
GET /api/flashcards
```

**Parámetros de consulta opcionales:**
- `category`: Filtrar por categoría ('bacterias', 'virusADN', 'virusARN', 'parasitos', 'hongos', 'todos')
- `search`: Buscar por texto en nombre, descripción, nombre científico o tipo

**Ejemplo de respuesta:**
```json
{
  "success": true,
  "count": 52,
  "data": [
    {
      "id": "A1",
      "nombre": "Estafilococo dorado",
      "nombreCientifico": "Staphylococcus aureus",
      "tipo": "Bacteria",
      "descripcion": "Grampositiva. Bacterias esféricas dispuestas en forma en racimos irregulares. Producen catalasa. Coagulasa positiva.",
      "codigoPatogeno": "• Cabeza de páncreas - hígado\n• Pericardio - pericardio\n• Cabeza de páncreas - suprarrenales\n• Apéndice - pleura",
      "conflictoBase": "Pertenece a la 1ª y 2ª etapa del sistema ontogénico de los microbios: Agresión a las corazas, activación del sistema de defensa, protección. Sensaciones: Vulnerabilidad, agresión, amenaza, rechazo, hostilidad, abandono, peligro en el nido. Indefenso, lastimado. El guardian de la integridad. Conflictos relacionados con la madre.",
      "notas": "Produce toxina estafilococcica, exotoxinas y enterotoxinas. Enfermedades relacionadas: Infecciones de heridas en la piel, foliculitis, abscesos, acné, osteomielitis, impetigo, síndrome del shock tóxico, síndrome de la piel escaldada, endocarditis, neumonia, intoxicación alimentaria, náusea, vómito, diarrea, mastitis."
    },
    // ... más flashcards
  ]
}
```

### 2. Obtener una flashcard específica

```
GET /api/flashcards/{id}
```

**Parámetros:**
- `id`: ID de la flashcard (ej: A1, B5, C3)

**Ejemplo de respuesta:**
```json
{
  "success": true,
  "data": {
    "id": "A1",
    "nombre": "Estafilococo dorado",
    "nombreCientifico": "Staphylococcus aureus",
    "tipo": "Bacteria",
    "descripcion": "Grampositiva. Bacterias esféricas dispuestas en forma en racimos irregulares. Producen catalasa. Coagulasa positiva.",
    "codigoPatogeno": "• Cabeza de páncreas - hígado\n• Pericardio - pericardio\n• Cabeza de páncreas - suprarrenales\n• Apéndice - pleura",
    "conflictoBase": "Pertenece a la 1ª y 2ª etapa del sistema ontogénico de los microbios: Agresión a las corazas, activación del sistema de defensa, protección. Sensaciones: Vulnerabilidad, agresión, amenaza, rechazo, hostilidad, abandono, peligro en el nido. Indefenso, lastimado. El guardian de la integridad. Conflictos relacionados con la madre.",
    "notas": "Produce toxina estafilococcica, exotoxinas y enterotoxinas. Enfermedades relacionadas: Infecciones de heridas en la piel, foliculitis, abscesos, acné, osteomielitis, impetigo, síndrome del shock tóxico, síndrome de la piel escaldada, endocarditis, neumonia, intoxicación alimentaria, náusea, vómito, diarrea, mastitis."
  }
}
```

## Integración con Framer

### Método 1: Componente de código personalizado

1. En Framer, crea un nuevo componente de código personalizado.
2. Copia el contenido del archivo `framer-component-example.jsx` en el editor de código.
3. Configura las propiedades del componente:
   - `apiUrl`: URL de la API (ej: "https://microflashcards.vercel.app/api/flashcards")
   - `category`: Categoría inicial (ej: "bacterias", "virusADN", "todos")
   - `backgroundColor`: Color de fondo
   - `textColor`: Color del texto
   - `accentColor`: Color de acento
   - `width`: Ancho del componente
   - `height`: Alto del componente

### Método 2: Iframe Embed

Si prefieres una solución más sencilla, puedes usar un iframe:

1. En Framer, añade un componente "Embed" o "HTML Embed".
2. Usa el siguiente código:

```html
<iframe 
  src="https://microflashcards.vercel.app" 
  width="100%" 
  height="600px" 
  frameborder="0"
  style="border-radius: 8px; overflow: hidden;"
></iframe>
```

## Ventajas de usar la API

1. **Personalización completa**: Puedes diseñar la interfaz como desees en Framer.
2. **Filtrado y búsqueda**: Puedes implementar filtros y búsqueda directamente desde Framer.
3. **Actualizaciones centralizadas**: Los datos se actualizan en un solo lugar.
4. **Rendimiento**: Solo se cargan los datos necesarios, no toda la aplicación.

## Notas importantes

- La API tiene habilitado CORS para permitir solicitudes desde cualquier origen.
- Para producción, considera restringir los orígenes permitidos en la configuración CORS.
- Si necesitas más funcionalidades en la API, puedes extenderla añadiendo más endpoints.
