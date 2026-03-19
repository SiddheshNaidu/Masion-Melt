export type ScentFamily =
  | "Woody"
  | "Floral"
  | "Fresh"
  | "Dark & Smoky"
  | "Citrus";

export type ProductFormat = "Pocket Tin" | "Balm Stick" | "Signature Slider";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  scentFamily: ScentFamily;
  format: ProductFormat;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  price: number;
  comparePrice?: number;
  images: string[];
  image: string; // Default primary image
  badge?: "BESTSELLER" | "NEW" | "LIMITED";
  size: string;
  ingredients: string;
  howToUse: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
}
