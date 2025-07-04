import axios from "./axios";

export const getTiresRequest = () => axios.get("/tires");

export const getTiresByInspectionRequest = () =>
  axios.get("/tiresByInspection");

export const getTireRequest = (id) => axios.get(`/tires/${id}`);

export const getTiresByBandContinentalRequest = () => axios.get(`/tiresByBandContinental`);

export const getTiresByBandBandagRequest = () => axios.get(`/tiresByBandBandag`);

export const createTireRequest = (tires) => axios.post("/tires", tires);

export const deleteTireRequest = (id) => axios.delete(`/tire/${id}`);

export const updateTireRequest = (id, tire) => axios.put(`/tire/${id}`, tire);

export const updateProductionTireRequest = (id, tire) =>
  axios.put(`/editTire/${id}`, tire);

export const getTireByBarcodeRequest = (barCode) =>
  axios.post("/tireBarcode", { barCode });

export const quoteTiresRequest = (value) => axios.put("/quoteTires", value);

export const getQuoteTiresRequest = () => axios.get("/quoteTires");
