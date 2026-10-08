const API_BASE = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:3000" : "/api")
).replace(/\/+$/, "");

const API_URL = `${API_BASE.endsWith("/api") ? API_BASE : `${API_BASE}/api`}/products`;

const request = async (URL, options = {}) => {
  const response = await fetch(URL, options);

  if (!response.ok) {
    const rawText = await response.text();
    const cleanText = rawText
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    throw new Error(cleanText || "Unable to connect to product server");
  }

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
};

const getproducts = () => request(API_URL, { method: "GET" });

const getproduct = (id) => request(`${API_URL}/${id}`, { method: "GET" });

const creatproduct = (product) =>
  request(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

const updateProduct = (id, product) =>
  request(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

const deleteproduct = (id) =>
  request(`${API_URL}/${id}`, {
    method: "DELETE",
  });

export { getproducts, getproduct, creatproduct, updateProduct, deleteproduct };
