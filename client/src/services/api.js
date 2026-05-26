import axios from "axios";

const API = axios.create({
  baseURL: "https://verifly-server.onrender.com",
});

export default API;