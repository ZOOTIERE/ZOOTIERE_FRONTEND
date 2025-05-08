import { LoginFormData, RegisterFormData } from '../types/global';
import { apiInstance } from '../api/axios';  // La instancia de Axios que ya tienes
import { API_ENDPOINTS } from '../api/endpoints';

export const AuthService = {
  login: async (data: LoginFormData) => {
    try {
      const response = await apiInstance.post(API_ENDPOINTS.AUTH.LOGIN, data);
      localStorage.setItem('data', JSON.stringify(response.data));
      return response.status;
    } catch (error:any) {
      throw error.response ? error.response.data : new Error('Error en el login');
    }
  },

  register: async (data: RegisterFormData) => {
    try {
      const response = await apiInstance.post(API_ENDPOINTS.AUTH.REGISTER, data);
      localStorage.setItem('data', JSON.stringify(response.data));
      return response.status;
    } catch (error:any) {
      throw error.response ? error.response.data : new Error('Error en el registro');
    }
  }
};
