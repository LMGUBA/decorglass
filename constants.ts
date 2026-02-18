import { Product, MelamineTexture } from './types';

// Using custom generated images for premium look
export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Escritorio Minimalista Zen',
    category: 'Melamine',
    price: 450,
    image: '/images/products/desk-zen.png',
    description: 'Escritorio moderno con lineas limpias, ideal para espacios de trabajo compactos. Fabricado con melamina de alta resistencia de 18mm.'
  },
  {
    id: '2',
    name: 'Mesa de Centro Nordica',
    category: 'Melamine',
    price: 280,
    image: '/images/products/coffee-table-nordic.png',
    description: 'Mesa de centro estilo escandinavo. Perfecta para dar calidez a tu sala de estar.'
  },
  {
    id: '3',
    name: 'Ropero Modular 4 Puertas',
    category: 'Puertas',
    price: 890,
    image: '/images/products/wardrobe-modular.png',
    description: 'Amplio ropero con sistema de organizacion inteligente. Acabados premium y bisagras de cierre suave.'
  },
  {
    id: '4',
    name: 'Estanteria Industrial',
    category: 'Melamine',
    price: 320,
    image: '/images/products/shelving-industrial.png',
    description: 'Estanteria robusta con diseno abierto. Ideal para exhibir decoracion y libros.'
  },
  {
    id: '5',
    name: 'Gabinete de Cocina Moderno',
    category: 'Granito',
    price: 560,
    image: '/images/products/kitchen-cabinet-modern.png',
    description: 'Modulo de cocina inferior con cajones profundos y rieles telescopicos. Cubierta de granito natural.'
  },
  {
    id: '6',
    name: 'Mesa de Noche Flotante',
    category: 'Melamine',
    price: 120,
    image: '/images/products/nightstand-floating.png',
    description: 'Diseno aereo que facilita la limpieza y optimiza el espacio visual.'
  },
  {
    id: '7',
    name: 'Remodelación de Cocina Integral',
    category: 'Remodelaciones',
    price: 3500,
    image: '/images/services/remodelaciones.png',
    description: 'Transformación completa de cocina con acabados en melamina alto brillo y tablero de cuarzo.'
  },
  {
    id: '8',
    name: 'Puerta Principal de Madera',
    category: 'Puertas',
    price: 1200,
    image: '/images/services/puertas-talladas.png',
    description: 'Puerta sólida de madera con diseño tallado y acabados en barniz marino.'
  },
  {
    id: '9',
    name: 'Isla de Cocina Premium',
    category: 'Granito',
    price: 4200,
    image: '/images/services/granito-marmol.png',
    description: 'Isla central con cubierta de granito negro absoluto y base de melamina texturizada.'
  },
  {
    id: '10',
    name: 'Tocador de Baño Suspendido',
    category: 'Melamine',
    price: 850,
    image: '/images/products/nightstand-floating.png',
    description: 'Mueble de baño resistente a la humedad con cajones de cierre suave.'
  },
  {
    id: '11',
    name: 'Puerta de Ducha Vidrio Templado',
    category: 'Puertas',
    price: 1500,
    image: '/images/services/barandas-acero.png',
    description: 'Vidrio templado de 8mm con accesorios de acero inoxidable y sistema corredizo.'
  },
  {
    id: '12',
    name: 'Centro de Entretenimiento TV',
    category: 'Melamine',
    price: 2100,
    image: '/images/products/shelving-industrial.png',
    description: 'Panel de TV moderno con iluminación LED integrada y espacios de almacenamiento ocultos.'
  },
  {
    id: '13',
    name: 'Remodelación de Oficina Ejecutiva',
    category: 'Remodelaciones',
    price: 5800,
    image: '/images/products/desk-zen.png',
    description: 'Diseño integral de oficina con escritorio gerencial, credenza y estantería a medida.'
  },
  {
    id: '14',
    name: 'Barra de Bar Residencial',
    category: 'Granito',
    price: 3200,
    image: '/images/services/remodelaciones.png',
    description: 'Barra para área social con tope de granito exótico y detalles en madera.'
  },
  {
    id: '15',
    name: 'Closet Walk-in Lujoso',
    category: 'Melamine',
    price: 6500,
    image: '/images/products/wardrobe-modular.png',
    description: 'Sistema de closet abierto tipo boutique con iluminación y múltiples organizadores.'
  },
  {
    id: '16',
    name: 'Escaleras de Granito Negro',
    category: 'Granito',
    price: 4800,
    image: '/images/products/granite-stairs.png',
    description: 'Revestimiento de escaleras en granito negro absoluto con acabado antideslizante.'
  },
  {
    id: '17',
    name: 'Puerta Corrediza Industrial',
    category: 'Puertas',
    price: 1800,
    image: '/images/products/industrial-sliding-door.png',
    description: 'Puerta estilo granero con riel expuesto de acero negro y marco metálico.'
  },
  {
    id: '18',
    name: 'Baño Spa de Lujo',
    category: 'Remodelaciones',
    price: 7500,
    image: '/images/products/luxury-spa-bathroom.png',
    description: 'Remodelación completa de baño con acabados tipo spa, mármol y grifería dorada.'
  },
  {
    id: '19',
    name: 'Mesa de Comedor Cuarzo',
    category: 'Granito',
    price: 3600,
    image: '/images/products/quartz-dining-table.png',
    description: 'Mesa de comedor con cubierta de cuarzo blanco calacatta y base geométrica.'
  },
  {
    id: '20',
    name: 'Portón de Madera Teca',
    category: 'Puertas',
    price: 2900,
    image: '/images/products/wooden-gate.png',
    description: 'Portón exterior de madera teca resistente a la intemperie con diseño moderno.'
  },
  {
    id: '21',
    name: 'Zona de Parrilla Terraza',
    category: 'Remodelaciones',
    price: 4500,
    image: '/images/products/terrace-bbq.png',
    description: 'Diseño y construcción de zona BBQ con barra de granito y pérgola de madera.'
  },
  {
    id: '22',
    name: 'Vanity de Mármol',
    category: 'Granito',
    price: 2200,
    image: '/images/products/marble-vanity.png',
    description: 'Mueble de baño con lavabo esculpido en mármol carrara y gabinete flotante.'
  },
  {
    id: '23',
    name: 'Puerta Minimalista Blanca',
    category: 'Puertas',
    price: 950,
    image: '/images/products/white-minimalist-door.png',
    description: 'Puerta interior lacada en blanco mate con manija oculta y diseño flush.'
  },
  {
    id: '24',
    name: 'Master Suite Bedroom',
    category: 'Remodelaciones',
    price: 6200,
    image: '/images/products/master-suite-bedroom.png',
    description: 'Remodelación de dormitorio principal con cabecera acolchada a medida y walk-in closet.'
  },
  {
    id: '25',
    name: 'Sala de Estar Open Concept',
    category: 'Remodelaciones',
    price: 5500,
    image: '/images/products/modern-living-room.png',
    description: 'Integración de sala y comedor con diseño de iluminación y mobiliario a medida.'
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
