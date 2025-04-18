import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL_PUBLIC,
    withCredentials: true,
})

export default instance;