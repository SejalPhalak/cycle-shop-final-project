import api from "./api";

// Get all cycles
export const getAllCycles = async (category = "") => {
  const response = await api.get("/cycles", {
    params: category ? { category } : {},
  });

  return response.data;
};

// Get single cycle
export const getCycleById = async (id) => {
  const response = await api.get(`/cycles/${id}`);

  return response.data;
};

// Admin - Add Cycle
export const addCycle = async (cycleData) => {
  const formData = new FormData();

  formData.append("name", cycleData.name);
  formData.append("brand", cycleData.brand);
  formData.append("price", cycleData.price);
  formData.append("category", cycleData.category);
  formData.append("stock", cycleData.stock);
  formData.append("description", cycleData.description);

  if (cycleData.image) {
    formData.append("image", cycleData.image);
  }

  const response = await api.post("/cycles", formData);

  return response.data;
};

// Admin - Delete Cycle
export const deleteCycle = async (id) => {
  const response = await api.delete(`/cycles/${id}`);

  return response.data;
};

// Admin - Update Cycle
export const updateCycle = async (id, cycleData) => {
  const response = await api.put(
    `/cycles/${id}`,
    cycleData
  );

  return response.data;
};