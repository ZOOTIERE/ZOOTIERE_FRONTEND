import axios from 'axios';

export const apiInstance = axios.create({
  baseURL: 'http://localhost:3000',  // Ajusta según tu configuración
  timeout: 30000,  // Aumentado para archivos grandes
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
  },
});

// Interceptor para manejar errores globalmente
apiInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);