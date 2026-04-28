import type { Product } from "../types/Product";

type ApiManufacturer = {
  id: number;
  name: string;
};

type ApiProduct = {
  id: number;
  name: string;
  type: string;
  color: string;
  size: string;
  price: number;
  manufacturer?: ApiManufacturer;
  valmistaja?: ApiManufacturer;
};

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:8080/api/tuotteet");
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = (await res.json()) as ApiProduct[];

  return data.map((product) => ({
    id: product.id,
    name: product.name,
    type: product.type,
    color: product.color,
    size: product.size,
    price: product.price,
    manufacturer: product.manufacturer ??
      product.valmistaja ?? { id: 0, name: "Unknown" },
  }));
}

export async function fetchManufacturerProducts(
  id: number,
): Promise<Product[]> {
  const res = await fetch(
    `http://localhost:8080/api/valmistaja/${id}/vaatteet`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch manufacturer products");
  }
  const data = (await res.json()) as ApiProduct[];
  return data.map((product) => ({
    id: product.id,
    name: product.name,
    type: product.type,
    color: product.color,
    size: product.size,
    price: product.price,
    manufacturer: product.manufacturer ??
      product.valmistaja ?? { id: 0, name: "Unknown" },
  }));
}
