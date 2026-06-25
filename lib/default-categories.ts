// lib/default-categories.ts
export const DEFAULT_CATEGORIES = [
  { name: "Comida", icon: "🍔", color: "#FF6B6B", type: "expense" },
  { name: "Transporte", icon: "🚌", color: "#4ECDC4", type: "expense" },
  { name: "Salud", icon: "💊", color: "#45B7D1", type: "expense" },
  { name: "Entretenimiento", icon: "🎬", color: "#96CEB4", type: "expense" },
  { name: "Ropa", icon: "👕", color: "#FFEAA7", type: "expense" },
  { name: "Hogar", icon: "🏠", color: "#DDA0DD", type: "expense" },
  { name: "Educación", icon: "📚", color: "#98D8C8", type: "expense" },
  { name: "Salario", icon: "💰", color: "#51CF66", type: "income" },
  { name: "Freelance", icon: "💻", color: "#74C0FC", type: "income" },
] as const;
