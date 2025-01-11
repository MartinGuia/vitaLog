import axios from "./axios";

export const getTiresRequest = () => axios.get("/tires");

export const getTiresByInspectionRequest = () =>
  axios.get("/tiresByInspection");

export const getTireRequest = (id) => axios.get(`/tires/${id}`);

export const createTireRequest = (tires) => axios.post("/tires", tires);

export const deleteTireRequest = (id) => axios.delete(`/tires/${id}`);

export const updateTireRequest = (id, tire) => axios.put(`/tire/${id}`, tire);

export const updateFinalTireRequest = (id, tire) =>
  axios.put(`/editTire/${id}`, tire);

export const getTireByBarcodeRequest = (barCode) =>
  axios.post("/tireBarcode", { barCode });
