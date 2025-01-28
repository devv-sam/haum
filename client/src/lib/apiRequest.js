import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://haum.onrender.com",
  withCredentials: true, // Ensures cookies are sent
});

// ✅ Automatically attach token to every request
apiRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiRequest;
