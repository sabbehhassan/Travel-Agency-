import axios from "axios";

const api = axios.create({
  baseURL: "/api",  // ✅ relative URL (no localhost, no full domain)
});

export default api;
