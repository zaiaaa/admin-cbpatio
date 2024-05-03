import axios from "axios";

const Api = axios.create({
    baseURL: "https://cbpatio-production.up.railway.app"
})

export {Api}