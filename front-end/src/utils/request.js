import axios from "axios";

// Base Url Domain For Server (use REACT_APP_API_URL in production)
const request = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000"
});

export default request;