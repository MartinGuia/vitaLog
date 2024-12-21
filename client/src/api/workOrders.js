import axios from "./axios";

export const openWorkOrderRequest = (value) => axios.post("/open", value);
export const closeWorkOrderRequest = () => axios.post("/close");
export const getWorkOrdersRequest = () => axios.get("/workorders");
export const getWorkOrderRequest = (id) => axios.get(`/workorder/${id}`);
