import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// 定义响应数据的泛型接口
interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// 创建 axios 实例
const http = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
});

// 请求拦截器
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers['Authorization'] = 'Bearer YOUR_TOKEN';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    if(res.code !== 200){
        if(res.code === 401){
            console.warn("请登录后访问该页面")
            // window.location.href = '/login';
        }
        else{
            console.error(`Error: ${res.message}`)
            alert(`Error: ${res.message}`)
        }
        return Promise.reject(new Error(res.message || 'Error'));
    }else return res.data;
  },
  (error) => {
    // 统一错误处理
    console.error('Request Error:', error);
    alert("Network error, please try again later")
    return Promise.reject(error);
  }
);

// 封装请求函数
export const request = <T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  return http.request<ApiResponse<T>>(config).then((response) => response.data);
};
