import type { Manufacturer } from "./Manufacturer";

export interface Product {
  id: number;
  name: string;
  type: string;
  color: string;
  size: string;
  price: number;
  manufacturer: Manufacturer;
}
