import axios from "./axios";

export const closeWorkOrderRequest = () => axios.post("/close");
