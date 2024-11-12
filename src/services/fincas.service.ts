import { FincaFormData } from '../types/global';
import { apiInstance } from '../api/axios';

export const FincaService = {
  getAllFincas: async () => {
    try {
      const response = await apiInstance.get('/api/fincas/');
      return response.data;
    } catch (error:any) {
      throw error.response ? error.response.data : new Error('Error al obtener las fincas');
    }
  },

  createFinca: async (data: FincaFormData) => {
    try {
      const response = await apiInstance.post('/api/fincas/', data);
      return response.data;
    } catch (error:any) {
      throw error.response ? error.response.data : new Error('Error al crear la finca');
    }
  }
};
