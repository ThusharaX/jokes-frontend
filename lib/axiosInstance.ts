import axios from "axios";
import { getCookie } from "cookies-next";

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getCookie("currentUser"),
  },
  withCredentials: true,
});

export default axiosInstance;
