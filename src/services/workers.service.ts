import {  WorkerForm } from '../types/global';
import { apiInstance } from '../api/axios';
import { API_ENDPOINTS } from '../api/endpoints';

export const WorkersServices = {
  listWorkers: async () => {
    try {
      const response = await apiInstance.get(API_ENDPOINTS.WORKERS.LIST);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Error al obtener la vacuna');
    }
  },

  createWorker: async (data: WorkerForm) => {
    try {
      const response = await apiInstance.post(API_ENDPOINTS.WORKERS.CREATE, data);
      return response;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Error al registrar la vacuna');
    }
  },
  listById: async (id: string) => {
    try {
      const response = await apiInstance.get(API_ENDPOINTS.WORKERS.LISTBYID(id));
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Error al obtener la vacuna');
    }
  },
};
