import axios from "./axios";

export const openWorkOrderRequest = (value) => axios.post("/open", value);
export const reOpenWorkOrderRequest = (value) => axios.post("/reOpen", value);
export const closeWorkOrderRequest = (data) => axios.post("/close", data);
export const getWorkOrdersRequest = () => axios.get("/workorders");
export const getWorkOrderRequest = (id) => axios.get(`/workorder/${id}`);
export const deleteWorkOrderRequest = (id) => axios.delete(`/deleteWorkorder/${id}`);
export const quoteWorkOrderRequest = (data) => axios.put(`/quoteWorkOrder`, data);
export const editWorkOrderRequest = (id, data) => axios.put(`/workorder/${id}`, data);
export const getQuoteWorkOrderRequest = () => axios.get(`/quoteWorkOrder`);
