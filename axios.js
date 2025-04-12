// axios.js (di root project)
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/api-zalpe-komputer/api/",
  timeout: 10000,
});

export default api;
