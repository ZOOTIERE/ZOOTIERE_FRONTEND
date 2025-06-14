import { VaccineForm } from '../types/global';
import { apiInstance } from '../api/axios';
import { API_ENDPOINTS } from '../api/endpoints';

export const VacunaService = {
  getVacunaById: async (id: string) => {
    try {
      const response = await apiInstance.get(API_ENDPOINTS.VACCINES.GETANIMALVACCINES(id));
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Error al obtener la vacuna');
    }
  },

  createVacuna: async (data: VaccineForm) => {
    try {
      const response = await apiInstance.post(API_ENDPOINTS.VACCINES.CREATE, data);
      return response;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Error al registrar la vacuna');
    }
  },
};
