const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error("VITE_API_URL is not defined");
}

export async function apiFetch(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
  });

  if (!response.ok) {
    // Improved error handling
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || errorData.error || `API Error: ${response.status}`);
    } catch (jsonError) {
      // If response is not JSON, fall back to text
      const errorText = await response.text();
      throw new Error(errorText || `API Error: ${response.status} ${response.statusText}`);
    }
  }

  // CHANGED: Return the raw Response object instead of parsed JSON
  return response;
}

// ADD a separate function for JSON parsing if needed
export async function apiFetchJson(endpoint, options = {}) {
  const response = await apiFetch(endpoint, options);
  return response.json();
}