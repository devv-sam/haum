import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// Add request interceptor to inject auth token
apiRequest.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Add response interceptor to handle auth errors
apiRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiRequest;
