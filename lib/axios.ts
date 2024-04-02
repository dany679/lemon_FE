import { BASE_HTTP } from "@/utils/constants";
import axios from "axios";

export default axios.create({
  baseURL: BASE_HTTP,
  headers: { "Content-Type": "application/json" },
});

export const axiosAuth = axios.create({
  baseURL: BASE_HTTP,
  headers: { "Content-Type": "application/json" },
});

// axiosAuth.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   function (error) {
//     console.log(error.status === 401);

//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );
