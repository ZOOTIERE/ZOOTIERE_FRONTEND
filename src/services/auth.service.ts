import { LoginFormData, RegisterFormData } from '../types/global';
import { apiInstance } from '../api/axios';  // La instancia de Axios que ya tienes

export const AuthService = {
  login: async (data: LoginFormData) => {
    try {
      const response = await apiInstance.post('/api/users/login/', data);
      return response.status;
    } catch (error:any) {
      throw error.response ? error.response.data : new Error('Error en el login');
    }
  },

  register: async (data: RegisterFormData) => {
    try {
      const response = await apiInstance.post('/api/users/register/', data);
      return response.status;
    } catch (error:any) {
      throw error.response ? error.response.data : new Error('Error en el registro');
    }
  }
};
