import axios from "./axios";

export const closeWorkOrderRequest = () => axios.post("/close");
export const getWorkOrderRequest = () => axios.get("/workorders");
