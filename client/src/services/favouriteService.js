import api from "./api";

// Get favourites
export const getFavourites = async () => {
  const response = await api.get("/favourites");

  return response.data;
};

// Add favourite
export const addFavourite = async (cycleId) => {
  const response = await api.post(
    `/favourites/${cycleId}`
  );

  return response.data;
};

// Remove favourite
export const removeFavourite = async (cycleId) => {
  const response = await api.delete(
    `/favourites/${cycleId}`
  );

  return response.data;
};