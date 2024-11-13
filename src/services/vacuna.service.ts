import { VacunaFormData } from '../types/global';
import { apiInstance } from '../api/axios';

export const VacunaService = {
  getAllVacunas: async () => {
    try {
      const response = await apiInstance.get('/api/vacunas/');
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Error al obtener las vacunas');
    }
  },

  getVacunaById: async (id: string | number) => {
    try {
      const response = await apiInstance.get(`/api/vacunas/${id}/`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Error al obtener la vacuna');
    }
  },

  createVacuna: async (data: VacunaFormData) => {
    try {
      const response = await apiInstance.post('/api/vacunas/', data);
      return response;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Error al registrar la vacuna');
    }
  },
};
