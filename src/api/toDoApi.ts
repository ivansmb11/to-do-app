import axios, { AxiosRequestConfig } from 'axios';
import { refreshToken } from '@/helpers/refreshToken';

const toDoApi = axios.create({
  baseURL: process.env.VUE_APP_API_URI + '/todo',
});

toDoApi.interceptors.request.use( (config: AxiosRequestConfig): AxiosRequestConfig => {
  config.headers!.Authorization = `Bearer ${ localStorage.getItem('access_token') }`;
  return config;
});

toDoApi.interceptors.response.use(
  ( response: any ) => {
    return response;
}, async( error: any ) => {
  const token = localStorage.getItem('refresh_token');
  if ( error.response.status === 403 && token ) {
    const originalRequest = error.config;
    const newToken = await refreshToken( token );
    originalRequest.headers.Authorization = `Bearer ${ newToken }`;
    return axios( originalRequest );
  }
  return Promise.reject(error);
});

export default toDoApi;