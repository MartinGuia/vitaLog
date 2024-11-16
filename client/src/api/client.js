import axios from "./axios";

export const registerClientRequest = (user) => axios.post(`/addClient`, user)