import type { Product } from "../types/Product";
import type { UserAccount } from "../types/UserAccount";
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

export async function login(
  username: string,
  password: string,
): Promise<UserAccount> {
  try {
    const res = await fetchWithTimeout(getApiUrl("/api/auth/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      // Try to extract a helpful error message from the response body
      const contentType = res.headers.get("content-type") || "";
      let errorMessage = `Failed to login (${res.status})`;
      try {
        if (contentType.includes("application/json")) {
          const errData = await res.json();
          errorMessage = errData?.message ?? JSON.stringify(errData);
        } else {
          const text = await res.text();
          errorMessage = text || errorMessage;
        }
      } catch {
        // ignore parsing errors and fall back to generic message
      }
      throw new Error(errorMessage);
    }

    // Response may be JSON or plain text (some backends return token as text)
    const contentType = res.headers.get("content-type") || "";
    let data: unknown;
    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();
      try {
        data = JSON.parse(text);
      } catch {
        data = { token: text };
      }
    }

    const account = (data as Partial<UserAccount>) ?? {};
    if (!account.token) {
      throw new Error("Login succeeded but no token was returned");
    }

    sessionStorage.setItem("JWT Token", account.token);

    // Ensure returned object conforms to UserAccount shape
    return account as UserAccount;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function register(
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
): Promise<void> {
  try {
    const res = await fetchWithTimeout(getApiUrl("/api/auth/register"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, firstName, lastName, email, password }),
    });

    if (!res.ok) {
      const contentType = res.headers.get("content-type") || "";
      let errorMessage = `Registration failed (${res.status})`;
      try {
        if (contentType.includes("application/json")) {
          const errData = await res.json();
          errorMessage = errData?.message ?? JSON.stringify(errData);
        } else {
          const text = await res.text();
          errorMessage = text || errorMessage;
        }
      } catch {
        // ignore
      }
      throw new Error(errorMessage);
    }

    // Registration successful - no token returned, user needs to log in
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
}

export function authFetch(url: string, options: RequestInit = {}) {
  const token = sessionStorage.getItem("JWT Token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const defaultOptions: RequestInit = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return fetchWithTimeout(getApiUrl(url), { ...defaultOptions, ...options });
}
