import axios from "./axios";

export const registerClientRequest = (user) => axios.post(`/addClient`, user)

export const deleteClientRequest = (id) => axios.delete(`/deleteClient/${id}`,)
export const getClientsRequest = () => axios.get(`/getClients`)
export const getClientRequest = (id) => axios.get(`/getClient/${id}`)
export const updateClientRequest = (id, client) => axios.put(`/editClient/${id}`, client)

export const getClientReportRequest = (data) =>
    axios.post(`/reportByClient`, data);