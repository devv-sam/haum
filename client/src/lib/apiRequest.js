import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://haum.onrender.com",
  withCredentials: true, // Ensure cookies are sent with requests
});

export default apiRequest;
