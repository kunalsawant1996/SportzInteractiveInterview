import axios from "axios";
import config from "../config/index";

const client = axios.create(config.api);
export const requestDetails = (method, url) => {
    let requestData = {
        method: method,
        url: url
    }
    return client(requestData);
}

// Request interceptor
client.interceptors.request.use(
    request => {
      return request;
    },
    error => {
      return Promise.reject(error);
    }
  );
  
  // Response interceptor
  client.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      return Promise.reject(error);
    }
  );