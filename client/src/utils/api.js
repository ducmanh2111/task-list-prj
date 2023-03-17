import axios from "axios";

const API_URL = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000
});


axiosInstance.interceptors?.request.use(
  config => {
    const user_info = JSON.parse(localStorage.getItem('user_info'));

    config.headers = {
      'Content-Type': 'application/json',
      ...config.headers,
      'access-token': user_info?.['access-token'],
      client: user_info?.['client'],
      uid: user_info?.['uid']
    };

    return config;
  },
  error => {
    throw error;
  }
);

axiosInstance.interceptors?.response.use(
  response => {
    return response;
  },
  error => {
    throw error;
  }
);

export default axiosInstance;
