import axios from "axios"

export const API_URL = "http://localhost:5454"


export const api = axios.create({
    baseURL:API_URL,
    headers:{
        "Content-Type": "application/json",
    }
});

api.interceptors.request.use(
  (config) => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);