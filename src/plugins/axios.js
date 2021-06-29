import axiosStatic from "axios";

const axios = axiosStatic.create({
  baseURL: "/api/",
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axios;
