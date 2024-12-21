import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

export default function (axiosConfig: AxiosRequestConfig): Promise<AxiosResponse> {
    const service: AxiosInstance = axios.create({
        headers: {
            'Content-Type': 'application/json',
        },
        // baseURL: import.meta.env.VITE_APP_BASE_URL,
        baseURL: "http://localhost:3001/api",
        timeout: 10000,
    });

    // Add a request interceptor
    service.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            // Do something before request is sent
            return config;
        },
        (error: AxiosError) => {
            // Do something with request error
            console.log('error request', error);
            return Promise.reject(error);
        }
    );

    // Add a response interceptor
    service.interceptors.response.use(
        (response: AxiosResponse) => {

            // Any status code that lies within the range of 2xx causes this function to trigger
            // Do something with response data
            return response;
        },
        (error: AxiosError) => {
            // Any status codes that fall outside the range of 2xx cause this function to trigger
            // Do something with response error
            console.log('response', error);
            return Promise.reject(error);
        }
    );

    return service(axiosConfig);
}
