import axios from "./axios.js";

// const API = 'http://localhost:4000/api';

export const registerRequest = (user) => axios.post(`/register`, user);
export const loginRequest = (user) => axios.post(`/login`, user);
// export const logoutRequest = (user) => axios.post(`/logout`)
export const verifyTokenRequest = () => axios.get(`/verify`);
export const getUsersRequest = () => axios.get(`/getUsers`);
export const getUserRequest = (id) => axios.get(`/profile/${id}`);

export const updateUserRequest = (id, user) =>
  axios.put(`/editUser/${id}`, user);

export const deleteUserRequest = (id) => axios.delete(`/deleteUser/${id}`);

export const getRolesRequest = () => axios.get("/get-roles");


