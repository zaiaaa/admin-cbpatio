import axios from "axios";

const Api = axios.create({
    baseURL: "https://cbpatio.onrender.com"
})

export {Api}