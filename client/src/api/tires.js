import axios from "./axios";

export const getTiresRequest = () => axios.get("/tires");

export const getTireRequest = (id) => axios.get(`/tires/${id}`);

export const createTireRequest = (tires) =>
  axios.post("/tires", tires);

export const deleteTireRequest = (id) => axios.delete(`/tires/${id}`);

export const updateTireRequest = (id,tires) =>
  axios.put(`/tire/${id}`, tires);

export const getTireByBarcodeRequest = (barCode) =>
  axios.post("/tires/barcode", { barCode });
