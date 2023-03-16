import axios from 'axios';
const API_URL = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000
});

export default axiosInstance;
