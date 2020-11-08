import axios from "axios";
import { toast } from "react-toastify";

const headers = {};
headers["x-rapidapi-key"] =
  "e3920ee304msh66b63248a467261p18c588jsn353bbdad372f";
headers["x-rapidapi-host"] = "countries-cities.p.rapidapi.com";
headers["useQueryString"] = true;
const http = axios.create({
  headers: {
    ...headers,
  },
});

http.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error("Somthing failed on the server! Try again later", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
    });
  }
  return Promise.reject(error);
});

export default {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
};
