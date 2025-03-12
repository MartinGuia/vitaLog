import axios from "axios";

const instance = axios.create({
    baseURL: REACT_APP_BACKEND_URL_PUBLIC,
    withCredentials: true,
})

export default instance;