import { AnimalFormData } from '../types/global';
import { apiInstance } from '../api/axios';
import { API_ENDPOINTS } from '../api/endpoints';

export const AnimalService = {
  // Métodos para Animales
  getAllAnimals: async (id: string) => {
    try {
      const response = await apiInstance.get(API_ENDPOINTS.ANIMAL.LISTBYFINCA(id));
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Error al obtener los animales');
    }
  },

  getAnimalById: async (id: string) => {
    try {
      const response = await apiInstance.get(API_ENDPOINTS.ANIMAL.LISTBYID(id));
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Error al obtener el animal');
    }
  },

  createAnimal: async (data: AnimalFormData) => {
    try {
      const response = await apiInstance.post(API_ENDPOINTS.ANIMAL.CREATE, data);
      return response;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Error al registrar el animal');
    }
  },

};