import axios from "./axios";

export const getTireRequest = () => axios.get("/tires");

export const getTiresRequest = (id) => axios.get(`/tires/${id}`);

export const createTireRequest = (tires) =>
  axios.post("/tires", tires);

export const deleteTireRequest = (id) => axios.delete(`/tires/${id}`);

export const updateTireRequest = (tires) =>
  axios.put(`/tires/${tires._id}`, tires);
