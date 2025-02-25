import axios from "./axios"

export const printLabelRequest = (text) => axios.post(`/print`, text)