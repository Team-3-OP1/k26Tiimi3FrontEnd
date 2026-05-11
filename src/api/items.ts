import type { Product } from "../types/Product";
import { getApiUrl, fetchWithTimeout } from "../config/api";

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
  const res = await fetchWithTimeout(getApiUrl("/api/tuotteet"));
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
  const res = await fetchWithTimeout(
    getApiUrl(`/api/valmistaja/${id}/vaatteet`),
  );
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
