export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export interface GeneratedVariant {
  id: string;
  textureName: string;
  imageUrl: string;
  loading: boolean;
  error?: string;
}

export enum AppView {
  HOME = 'HOME',
  CATALOG = 'CATALOG',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  SERVICES = 'SERVICES',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT',
}

export interface MelamineTexture {
  id: string;
  name: string;
  promptDescription: string;
  colorCode: string;
}
