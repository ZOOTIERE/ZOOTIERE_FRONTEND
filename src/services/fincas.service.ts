import { FincaFormData } from '../types/global';
import { apiInstance } from '../api/axios';
import { API_ENDPOINTS } from '../api/endpoints';

export const FincaService = {
  getAllFincas: async () => {
    try {
      const response = await apiInstance.get(API_ENDPOINTS.FINCAS.LIST);
      return response;
    } catch (error:any) {
      throw error.response ? error.response.data : new Error('Error al obtener las fincas');
    }
  },
  getFincaID: async (id:string) => {
    try {
      const response = await apiInstance.get(API_ENDPOINTS.FINCAS.LISTBYID(id));
      return response;
    } catch (error:any) {
      throw error.response ? error.response.data : new Error('Error al obtener las fincas');
    }
  },
  createFinca: async (data: FincaFormData) => {
    try {
      const response = await apiInstance.post(API_ENDPOINTS.FINCAS.CREATE, data);
      return response;
    } catch (error:any) {
      throw error.response ? error.response.data : new Error('Error al crear la finca');
    }
  },
  getFincaName: async (name:string) => {
    try {
      const response = await apiInstance.get(API_ENDPOINTS.FINCAS.LISTBYNAME(name));
      return response;
    } catch (error:any) {
      throw error.response ? error.response.data : new Error('Error al obtener las fincas');
    }
  },
};
