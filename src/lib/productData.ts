
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  featured: boolean;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Smartphone Premium",
    description: "Un smartphone de última generación con cámara de alta resolución y gran rendimiento.",
    price: 799.99,
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2042&auto=format&fit=crop",
    category: "electronics",
    featured: true
  },
  {
    id: 2,
    name: "Laptop Ultraligera",
    description: "Laptop potente y ultraligera para profesionales que necesitan movilidad.",
    price: 1299.99,
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop",
    category: "electronics",
    featured: true
  },
  {
    id: 3,
    name: "Auriculares Inalámbricos",
    description: "Auriculares con cancelación de ruido y calidad de sonido excepcional.",
    price: 249.99,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    category: "electronics",
    featured: false
  },
  {
    id: 4,
    name: "Smartwatch Deportivo",
    description: "Reloj inteligente con GPS y monitoreo de actividad física.",
    price: 199.99,
    imageUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=2127&auto=format&fit=crop",
    category: "electronics",
    featured: true
  },
  {
    id: 5,
    name: "Cámara Digital",
    description: "Cámara digital con sensor de última generación y grabación de video en 4K.",
    price: 899.99,
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1938&auto=format&fit=crop",
    category: "electronics",
    featured: false
  },
  {
    id: 6,
    name: "Tablet Multimedia",
    description: "Tablet con pantalla de alta resolución perfecta para consumo de contenido multimedia.",
    price: 449.99,
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1975&auto=format&fit=crop",
    category: "electronics",
    featured: false
  },
  {
    id: 7,
    name: "Altavoz Bluetooth",
    description: "Altavoz portátil con conexión Bluetooth y batería de larga duración.",
    price: 129.99,
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2069&auto=format&fit=crop",
    category: "electronics",
    featured: false
  },
  {
    id: 8,
    name: "Monitor Ultrawide",
    description: "Monitor curvo ultrawide para una experiencia inmersiva de trabajo y juego.",
    price: 549.99,
    imageUrl: "https://images.unsplash.com/photo-1547119957-637f8679db1e?q=80&w=2064&auto=format&fit=crop",
    category: "electronics",
    featured: false
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getAllCategories = (): string[] => {
  const categories = new Set(products.map(product => product.category));
  return Array.from(categories);
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(price);
};

// Add the missing function to get all products
export const getAllProducts = (): Product[] => {
  return products;
};
