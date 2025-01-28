import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://haum.onrender.com",
  withCredentials: true,
});

// Add a request interceptor to include the token in the headers
apiRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    console.log("Token:", token); // Debugging line
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Include the token in the headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiRequest;
