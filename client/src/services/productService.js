const API_BASE_URL = "https://fakestoreapi.in/api";

export const getAllProducts = async () => {
  const res = await fetch(`${API_BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return await res.json();
};

export const getAllCategories = async () => {
  const res = await fetch(`${API_BASE_URL}/products/category`);
  if (!res.ok) throw new Error(`Failed to fetch categories`);
  return await res.json();
};

export const getProductsByCategory = async (category) => {
  const res = await fetch(`${API_BASE_URL}/products/category?type=${category}`);
  if (!res.ok) throw new Error(`Failed to fetch products from category: ${category}`);
  return await res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch product with id: ${id}`);
  return await res.json();
};

export const createUser = async (userData) => {
  const res = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error("Failed to create user");
  return await res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Failed to delete user with id: ${id}`);
  return await res.json();
};

export const fetchFeaturedProducts = async (limit = 4) => {
  const all = await getAllProducts();
  const shuffled = all.products.sort(() => 0.5 - Math.random());
  const finalProducts = shuffled.slice(0, limit);
  return finalProducts;
};