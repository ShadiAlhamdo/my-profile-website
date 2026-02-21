import axios from "axios";

// Base Url Domain For Server (use REACT_APP_API_URL in production)
const request = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "https://api.shadialhamdo.com"
});

export default request;
