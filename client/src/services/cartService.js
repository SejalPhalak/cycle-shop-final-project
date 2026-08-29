import api from "./api";

// Get cart
export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};

// Add to cart
export const addToCart = async (cycleId, quantity) => {
  const response = await api.post(`/cart/${cycleId}`, {
    quantity,
  });

  return response.data;
};

// Update quantity
export const updateCart = async (cycleId, quantity) => {
  const response = await api.patch(`/cart/${cycleId}`, {
    quantity,
  });

  return response.data;
};

// Remove item
export const removeFromCart = async (cycleId) => {
  const response = await api.delete(`/cart/${cycleId}`);

  return response.data;
};