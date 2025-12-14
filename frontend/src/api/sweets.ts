import api from "./axios";

export const getAllSweets = async () => {
  const res = await api.get("/sweets");
  return res.data;
};

export const searchSweets = async (params: {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  const res = await api.get("/sweets/search", { params });
  return res.data;
};

export const purchaseSweet = async (id: string) => {
  const res = await api.post(`/sweets/${id}/purchase`, {
    quantity: 1, // ✅ REQUIRED
  });
  return res.data;
};

// ADMIN ONLY
export const addSweet = async (data: {
  name: string;
  category: string;
  price: number;
  quantity: number;
}) => {
  const res = await api.post("/sweets", data);
  return res.data;
};

// ADMIN ONLY
export const deleteSweet = async (id: string) => {
  const res = await api.delete(`/sweets/${id}`);
  return res.data;
};
