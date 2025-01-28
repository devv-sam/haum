import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://haum.onrender.com",
  withCredentials: true,
});

// Add request interceptor to inject auth token
apiRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Get token directly
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle auth errors
apiRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("token"); // Remove token on logout
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiRequest;
