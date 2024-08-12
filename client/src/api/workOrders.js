import axios from "./axios";

export const closeWorkOrderRequest = () => axios.post("/close");
export const getWorkOrdersRequest = () => axios.get("/workorders");
export const getWorkOrderRequest = (id) => axios.get(`/workorder/${id}`);
