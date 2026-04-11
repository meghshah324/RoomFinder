const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error("VITE_API_URL is not defined");
}

export async function apiFetch(endpoint, options = {}) {
  const url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}${endpoint}`;

  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;
  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers || {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    const fallbackMessage = `API Error: ${response.status} ${response.statusText}`;
    const responseText = await response.text();

    if (!responseText) {
      throw new Error(fallbackMessage);
    }

    try {
      const errorData = JSON.parse(responseText);
      throw new Error(errorData.message || errorData.error || fallbackMessage);
    } catch {
      throw new Error(responseText || fallbackMessage);
    }
  }

  return response;
}

export async function apiFetchJson(endpoint, options = {}) {
  const response = await apiFetch(endpoint, options);
  return response.json();
}