import axios, { AxiosInstance } from 'axios';
import { elMessage, getStorage } from '../utils/util';
import { elMessageType, storageType } from '../model/enum';

const request: AxiosInstance = axios.create({
  timeout: 10000,
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    //如果存在token，请求头携带token
    const token = getStorage(storageType.SESSION, 'token');
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    elMessage(elMessageType.ERROR, error.message);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    elMessage(elMessageType.ERROR, error.message);
  }
);

export default request;
