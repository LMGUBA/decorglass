import { Product, MelamineTexture } from './types';

// Using Unsplash images that clearly show furniture
export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Escritorio Minimalista Zen',
    category: 'Oficina',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800',
    description: 'Escritorio moderno con líneas limpias, ideal para espacios de trabajo compactos. Fabricado con melamina de alta resistencia de 18mm.'
  },
  {
    id: '2',
    name: 'Mesa de Centro Nórdica',
    category: 'Sala',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=800',
    description: 'Mesa de centro estilo escandinavo. Perfecta para dar calidez a tu sala de estar.'
  },
  {
    id: '3',
    name: 'Ropero Modular 4 Puertas',
    category: 'Dormitorio',
    price: 8900,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800',
    description: 'Amplio ropero con sistema de organización inteligente. Acabados premium y bisagras de cierre suave.'
  },
  {
    id: '4',
    name: 'Estantería Industrial',
    category: 'Oficina',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=800',
    description: 'Estantería robusta con diseño abierto. Ideal para exhibir decoración y libros.'
  },
  {
    id: '5',
    name: 'Gabinete de Cocina Moderno',
    category: 'Cocina',
    price: 5600,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800',
    description: 'Módulo de cocina inferior con cajones profundos y rieles telescópicos.'
  },
  {
    id: '6',
    name: 'Mesa de Noche Flotante',
    category: 'Dormitorio',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=800',
    description: 'Diseño aéreo que facilita la limpieza y optimiza el espacio visual.'
  }
];

export const TEXTURE_POOL: MelamineTexture[] = [
  {
    id: 'oak',
    name: 'Roble Rústico',
    promptDescription: 'light rustic oak wood melamine texture',
    colorCode: '#d4c5a9'
  },
  {
    id: 'walnut',
    name: 'Nogal Oscuro',
    promptDescription: 'dark rich walnut wood melamine texture',
    colorCode: '#5d4037'
  },
  {
    id: 'grey',
    name: 'Gris Grafito Mate',
    promptDescription: 'matte dark graphite grey melamine texture',
    colorCode: '#37474f'
  },
  {
    id: 'white',
    name: 'Blanco Alto Brillo',
    promptDescription: 'high gloss pure white melamine texture',
    colorCode: '#f5f5f5'
  },
  {
    id: 'maple',
    name: 'Arce Natural',
    promptDescription: 'light natural maple wood melamine texture',
    colorCode: '#e6d8b8'
  },
  {
    id: 'teak',
    name: 'Teca Miel',
    promptDescription: 'warm honey teak wood melamine texture',
    colorCode: '#c99a5b'
  },
  {
    id: 'ash',
    name: 'Fresno Claro',
    promptDescription: 'light ash wood melamine texture with subtle grain',
    colorCode: '#d9cdb3'
  },
  {
    id: 'wenge',
    name: 'Wengue Intenso',
    promptDescription: 'deep wenge wood melamine texture',
    colorCode: '#3b2f2f'
  },
  {
    id: 'taupe',
    name: 'Taupe Suave',
    promptDescription: 'matte warm taupe melamine texture',
    colorCode: '#b8a69a'
  },
  {
    id: 'cement',
    name: 'Cemento Claro',
    promptDescription: 'light concrete melamine texture with subtle speckles',
    colorCode: '#c9c8c4'
  },
  {
    id: 'black',
    name: 'Negro Mate',
    promptDescription: 'matte black melamine texture',
    colorCode: '#1f1f1f'
  }
];
