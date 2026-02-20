import axios from "axios";

// Base Url Domain For Server
const request = axios.create({
    baseURL:"http://localhost:5000"
});

export default request;