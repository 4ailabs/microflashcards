export default function IconRenderer({ item }) {
  // Función para obtener color del icono basado en el ID
  const getIconColor = (id) => {
    if (!id) return "#3b82f6";
    
    const prefix = id.charAt(0);
    const num = parseInt(id.substring(1));
    
    switch (prefix) {
      case "A": return "#3b82f6"; // Azul para bacterias
      case "B": return num <= 18 ? "#f59e0b" : "#ef4444"; // Naranja para virus ADN, rojo para virus ARN
      case "C": return "#10b981"; // Verde para parásitos
      case "D": return "#14b8a6"; // Verde azulado para hongos
      default: return "#3b82f6";
    }
  };
  
  const type = item.tipo?.toLowerCase() || "";
  const id = item.id || "";
  
  // Tamaño común para todos los iconos
  const iconSize = 120;
  const iconColor = getIconColor(id);
  
  if (type.includes("bacteria")) {
    return (
      <svg width={iconSize} height={iconSize} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Bacterias en forma de cocos (racimos) */}
        <circle cx="40" cy="40" r="12" stroke={iconColor} strokeWidth="2" fill="none" />
        <circle cx="60" cy="30" r="12" stroke={iconColor} strokeWidth="2" fill="none" />
        <circle cx="80" cy="40" r="12" stroke={iconColor} strokeWidth="2" fill="none" />
        <circle cx="50" cy="60" r="12" stroke={iconColor} strokeWidth="2" fill="none" />
        <circle cx="70" cy="60" r="12" stroke={iconColor} strokeWidth="2" fill="none" />
        <circle cx="40" cy="80" r="12" stroke={iconColor} strokeWidth="2" fill="none" />
        <circle cx="60" cy="80" r="12" stroke={iconColor} strokeWidth="2" fill="none" />
      </svg>
    );
  }
  
  if (type.includes("virus")) {
    // Determinar si es ADN o ARN según el ID
    const isADN = id.startsWith('B') && parseInt(id.substring(1)) <= 18;
    
    return (
      <svg width={iconSize} height={iconSize} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Icono de virus con forma de cápside icosaédrica */}
        <circle cx="60" cy="60" r="35" stroke={iconColor} strokeWidth="2" fill="none" />
        <path d="M60 25 L75 40 L90 50 L75 80 L60 95 L45 80 L30 50 L45 40 Z" stroke={iconColor} strokeWidth="2" fill="none" />
        <circle cx="60" cy="60" r="15" stroke={iconColor} strokeWidth="2" fill="none" />
        {/* Proyecciones para diferenciar ADN/ARN */}
        {isADN ? (
          <>
            <line x1="60" y1="25" x2="60" y2="15" stroke={iconColor} strokeWidth="2" />
            <line x1="90" y1="50" x2="100" y2="50" stroke={iconColor} strokeWidth="2" />
            <line x1="60" y1="95" x2="60" y2="105" stroke={iconColor} strokeWidth="2" />
            <line x1="30" y1="50" x2="20" y2="50" stroke={iconColor} strokeWidth="2" />
          </>
        ) : (
          <>
            <circle cx="60" cy="20" r="5" stroke={iconColor} strokeWidth="2" fill="none" />
            <circle cx="95" cy="50" r="5" stroke={iconColor} strokeWidth="2" fill="none" />
            <circle cx="60" cy="100" r="5" stroke={iconColor} strokeWidth="2" fill="none" />
            <circle cx="25" cy="50" r="5" stroke={iconColor} strokeWidth="2" fill="none" />
          </>
        )}
      </svg>
    );
  }
  
  if (type.includes("parásito") || type.includes("parasito")) {
    return (
      <svg width={iconSize} height={iconSize} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Forma de parásito con cuerpo alargado y segmentado */}
        <path d="M30 50 C35 40, 45 30, 60 30 C75 30, 85 40, 90 50 C85 60, 75 70, 60 70 C45 70, 35 60, 30 50 Z" stroke={iconColor} strokeWidth="2" fill="none" />
        <path d="M35 50 C38 43, 45 38, 55 38 C65 38, 72 43, 75 50 C72 57, 65 62, 55 62 C45 62, 38 57, 35 50 Z" stroke={iconColor} strokeWidth="2" fill="none" />
        <path d="M45 50 C47 46, 50 44, 55 44 C60 44, 63 46, 65 50 C63 54, 60 56, 55 56 C50 56, 47 54, 45 50 Z" stroke={iconColor} strokeWidth="2" fill="none" />
        <line x1="90" y1="50" x2="105" y2="45" stroke={iconColor} strokeWidth="2" />
        <line x1="90" y1="50" x2="105" y2="55" stroke={iconColor} strokeWidth="2" />
        <circle cx="30" cy="50" r="3" stroke={iconColor} strokeWidth="2" fill={iconColor} />
      </svg>
    );
  }
  
  if (type.includes("hongo")) {
    return (
      <svg width={iconSize} height={iconSize} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Forma de hongo con sombrero y tallo */}
        <path d="M40 60 C40 45, 80 45, 80 60 L75 80 L45 80 L40 60 Z" stroke={iconColor} strokeWidth="2" fill="none" />
        <path d="M50 80 L50 95" stroke={iconColor} strokeWidth="2" />
        <path d="M70 80 L70 95" stroke={iconColor} strokeWidth="2" />
        <path d="M35 60 C35 40, 85 40, 85 60" stroke={iconColor} strokeWidth="2" fill="none" />
        <circle cx="50" cy="55" r="3" stroke={iconColor} strokeWidth="1" fill="none" />
        <circle cx="60" cy="50" r="3" stroke={iconColor} strokeWidth="1" fill="none" />
        <circle cx="70" cy="55" r="3" stroke={iconColor} strokeWidth="1" fill="none" />
      </svg>
    );
  }
  
  // Por defecto
  return (
    <svg width={iconSize} height={iconSize} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="40" stroke={iconColor} strokeWidth="2" fill="none" />
      <circle cx="60" cy="60" r="20" stroke={iconColor} strokeWidth="2" fill="none" />
    </svg>
  );
}