import axios from "axios";

export const HttpAxios = axios.create({
    baseURL: process.env.BASE_URL
})