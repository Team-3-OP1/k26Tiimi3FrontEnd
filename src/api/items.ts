import type { Product } from "../types/Product";

type ApiProductType = {
  id: number;
  name?: string;
  nimi?: string;
};

function normalizeProductType(productType?: ApiProductType): Product["type"] {
  return {
    id: productType?.id ?? 0,
    name: productType?.name ?? productType?.nimi ?? "Unknown",
  };
}

type ApiManufacturer = {
  id: number;
  name: string;
};

type ApiProduct = {
  id: number;
  name: string;
  type?: ApiProductType;
  tyyppi?: ApiProductType;
  size?: string;
  koko?: string;
  price: number;
  manufacturer?: ApiManufacturer;
  valmistaja?: ApiManufacturer;
};

export async function fetchProducts(): Promise<Product[]> {
  // const res = await fetch("http://localhost:8080/api/tuotteet");
const BASE_URL = import.meta.env.VITE_API_URL ?? "https://backendtiimi3-opt3bakcend.2.rahtiapp.fi";
const res = await fetch(`${BASE_URL}/api/tuotteet`);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = (await res.json()) as ApiProduct[];

  return data.map((product) => ({
    id: product.id,
    name: product.name,
    type: normalizeProductType(product.type ?? product.tyyppi),
    size: product.size ?? product.koko ?? "-",
    price: product.price,
    manufacturer: product.manufacturer ??
      product.valmistaja ?? { id: 0, name: "Unknown" },
  }));
}

export async function fetchManufacturerProducts(
  id: number,
): Promise<Product[]> {

  //const res = await fetch(
  //  `http://localhost:8080/api/valmistaja/${id}/vaatteet`,
  //);
  const BASE_URL = import.meta.env.VITE_API_URL ?? "https://backendtiimi3-opt3bakcend.2.rahtiapp.fi";
  const res = await fetch(`${BASE_URL}/api/valmistaja/${id}/vaatteet`);
  if (!res.ok) {
    throw new Error("Failed to fetch manufacturer products");
  }
  const data = (await res.json()) as ApiProduct[];
  return data.map((product) => ({
    id: product.id,
    name: product.name,
    type: normalizeProductType(product.type ?? product.tyyppi),
    size: product.size ?? product.koko ?? "-",
    price: product.price,
    manufacturer: product.manufacturer ??
      product.valmistaja ?? { id: 0, name: "Unknown" },
  }));
}
