import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

export class HTTP {
    static get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return HTTP._handleRequest(axios.get(url, config));
    }

    static post<T, R>(url: string, data: T, config: AxiosRequestConfig): Promise<R> {
        return HTTP._handleRequest(axios.post(url, data, config));
    }

    private static _handleRequest(request: AxiosPromise) {
        return request
        .then((response) => response.data)
    }
};