/**
 * API Configuration Module
 *
 * This module handles API configuration with support for:
 * - Environment-specific settings (dev/production)
 * - Secure configuration without exposing sensitive data
 * - Timeout and error handling
 */

interface ApiConfig {
  baseUrl: string;
  timeout: number;
  debug: boolean;
}

/**
 * Get API configuration from environment variables
 *
 * Variables read from .env files:
 * - VITE_API_URL: Backend API base URL
 * - VITE_API_TIMEOUT: Request timeout in milliseconds (optional)
 * - VITE_API_DEBUG: Enable debug logging (optional)
 */
function getApiConfig(): ApiConfig {
  // Get base URL from environment or use sensible default
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";

  // Ensure URL doesn't have trailing slash
  const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;

  // Get timeout from environment (default: 10 seconds)
  const timeout = parseInt(import.meta.env.VITE_API_TIMEOUT || "10000", 10);

  // Debug mode (disabled in production)
  const debug =
    import.meta.env.VITE_API_DEBUG === "true" && import.meta.env.DEV;

  if (debug) {
    console.log("[API Config] Using base URL:", cleanBaseUrl);
  }

  return {
    baseUrl: cleanBaseUrl,
    timeout,
    debug,
  };
}

/**
 * Centralized API configuration object
 * Can be imported and used throughout the application
 */
export const apiConfig = getApiConfig();

/**
 * Helper function to build API endpoint URLs
 *
 * @param endpoint - The API endpoint path (e.g., "/api/tuotteet")
 * @returns Full API URL
 */
export function getApiUrl(endpoint: string): string {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${apiConfig.baseUrl}${cleanEndpoint}`;
}

/**
 * Helper function for fetch with timeout
 *
 * @param url - URL to fetch from
 * @param options - Fetch options
 * @returns Promise with timeout
 */
export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), apiConfig.timeout);

  try {
    if (apiConfig.debug) {
      console.log("[API] Fetching:", url);
    }

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    if (apiConfig.debug) {
      console.log("[API] Response status:", response.status);
    }

    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Validate that the API is configured correctly
 * Useful for startup checks
 */
export function validateApiConfig(): void {
  if (!apiConfig.baseUrl) {
    throw new Error(
      "API configuration error: VITE_API_URL is not set. Check your .env file.",
    );
  }

  // Ensure it's a valid URL
  try {
    new URL(apiConfig.baseUrl);
  } catch {
    throw new Error(
      `API configuration error: VITE_API_URL "${apiConfig.baseUrl}" is not a valid URL`,
    );
  }

  if (apiConfig.debug) {
    console.log("[API Config] Validation passed ✓");
    console.log("[API Config] Base URL:", apiConfig.baseUrl);
    console.log("[API Config] Timeout:", apiConfig.timeout, "ms");
  }
}
