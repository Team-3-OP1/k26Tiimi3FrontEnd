import type { Product } from "../types/Product";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:8080/api/tuotteet");
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}
