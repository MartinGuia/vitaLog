import axios from "./axios";

export const openWorkOrderRequest = (value) => axios.post("/open", value);
export const closeWorkOrderRequest = (data) => axios.post("/close", data);
export const getWorkOrdersRequest = () => axios.get("/workorders");
export const getWorkOrderRequest = (id) => axios.get(`/workorder/${id}`);
export const deleteWorkOrderRequest = (id) => axios.delete(`/deleteWorkorder/${id}`);
