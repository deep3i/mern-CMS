import axios from 'axios';
import { API_URL } from '../utils/config';

export const backendAPI = (token) => {
    return axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };