# MicroFlashcards

Aplicación de flashcards para estudio de microorganismos con enfoque en bacterias, virus, parásitos y hongos.

## Características

- Visualización en modo tarjeta o cuadrícula
- Filtrado por categorías: bacterias, virus ADN, virus ARN, parásitos y hongos
- Búsqueda por nombre o nombre científico
- Interfaz intuitiva y responsive

## Tecnologías

- Next.js
- React
- Framer Motion para animaciones
- CSS puro para estilos

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/microflashcards.git

# Navegar al directorio
cd microflashcards

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## Uso

La aplicación se ejecutará en http://localhost:3000. Puedes:

1. Navegar entre categorías usando las pestañas superiores
2. Buscar microorganismos por nombre
3. Alternar entre vista de tarjeta o cuadrícula
4. Hacer clic en una tarjeta para ver su información detallada

## Estructura del proyecto

```
microflashcards/
├── components/          # Componentes reutilizables
│   ├── MicroCard.js     # Componente de tarjeta individual
│   ├── MicroGrid.js     # Vista de cuadrícula
│   ├── SearchBar.js     # Barra de búsqueda
│   └── CategoryTabs.js  # Pestañas de categorías
├── data/                # Datos de microorganismos
│   ├── bacterias.js     
│   ├── virusADN.js      
│   ├── virusARN.js      
│   ├── parasitos.js     
│   └── hongos.js        
├── pages/               # Páginas de Next.js
│   └── index.js         # Página principal
└── styles/              # Archivos CSS
    └── globals.css      # Estilos globales
```