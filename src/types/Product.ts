import type { Manufacturer } from "./Manufacturer";
import type { ProductType } from "./ProductType";

export interface Product {
  id: number;
  name: string;
  type: ProductType;
  size: string;
  price: number;
  manufacturer: Manufacturer;
}
