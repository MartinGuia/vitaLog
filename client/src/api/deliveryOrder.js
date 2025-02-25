import axios from "./axios";

export const openDeliveryOrderRequest = (value) => axios.post("/openDeliveryOrder", value);
export const closeDeliveryOrderRequest = () => axios.post("/closeDeliveryOrder");
export const addTiresDeliveryOrderRequest = (values) => axios.post(`/addTires`, values)
export const getDeliveryOrdersRequest = () => axios.get("/deliveryOrders");
export const getDeliveryOrderRequest = (id) => axios.get(`/deliveryOrder/${id}`);
export const deleteDeliveryOrderRequest = (id) => axios.delete(`/deleteDeliveryOrder/${id}`);