import axios from "./axios"

export const registerDepartmentRequest = (department) => axios.post(`/department`, department)
export const getDepartmentsRequest = () => axios.get(`/departments`)