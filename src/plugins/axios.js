// src/plugins/axios.js
import axios from 'axios';
import { getToken, removeTokens } from '@/utils/token';

// Use environment variable for base URL
const baseURL = process.env.VUE_APP_API_BASE_URL;

// 🔓 Public (no-auth) instance
const apiWithoutAuth = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 🔐 Authenticated instance
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach access token to each request
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    config.headers['ngrok-skip-browser-warning'] = 'true';
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle unauthorized (401) responses
api.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response?.status === 401) {
      removeTokens();
      window.location.href = '/login'; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export { api, apiWithoutAuth };
