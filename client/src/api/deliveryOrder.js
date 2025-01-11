import axios from "./axios";

export const openDeliveryOrderRequest = (value) => axios.post("/openDeliveryOrder", value);
export const closeDeliveryOrderRequest = () => axios.post("/closeDeliveryOrder");
export const addTiresDeliveryOrderRequest = (values) => axios.post(`addTires`, values)
// export const getDeliveryOrdersRequest = () => axios.get("/workorders");
// export const getDeliveryOrderRequest = (id) => axios.get(`/workorder/${id}`);
// export const deleteDeliveryOrderRequest = (id) => axios.delete(`/deleteWorkorder/${id}`);