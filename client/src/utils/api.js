import axiosInstance from "./api-client"

axiosInstance.interceptors?.request.use(
  config => {
    config.headers = {
      'Content-Type': 'application/json',
      ...config.headers,
      'access-token': attributes['access-token'],
      client: attributes.client,
      uid: attributes.uid
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
