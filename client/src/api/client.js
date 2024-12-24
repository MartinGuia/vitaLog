import axios from "./axios";

export const registerClientRequest = (user) => axios.post(`/addClient`, user)
export const getClientsRequest = () => axios.get(`/getClients`)
export const getClientRequest = (id) => axios.get(`/getClient/${id}`)
export const updateClientRequest = (id, client) => axios.put(`/editClient/${id}`, client)