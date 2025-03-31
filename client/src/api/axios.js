import axios from "axios";

const instance = axios.create({
<<<<<<< HEAD
    baseURL: REACT_APP_BACKEND_URL_PUBLIC,
=======
    baseURL: process.env.REACT_APP_BACKEND_URL_PUBLIC,
>>>>>>> develop
    withCredentials: true,
})

export default instance;