export type Product = {
  product: ProductDetails;
};

export type ProductDetails = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  color_size_combinations: ColorSizeCombi[];
};

export type ColorSizeCombi = {
  product_id: string;
  color: Color;
  size: Size;
  availability: number;
};

export type Size = {
  id: string;
  name: string;
  abbreviation: string;
};

export type Color = {
  id: string;
  name: string;
  hex_code: string;
  bg_color?: string;
  ring_color?: string;
};