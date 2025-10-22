import axios from "axios";

export const BaseAPI = axios.create({
    baseURL:"http://localhost:3500"
})