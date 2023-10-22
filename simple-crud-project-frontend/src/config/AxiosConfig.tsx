import axios, {Axios} from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 2000,
    headers: { 'X-Custom-Header': 'foobar' }
})