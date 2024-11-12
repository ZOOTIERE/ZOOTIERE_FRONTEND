import { AnimalFormData } from '../types/global';
import { apiInstance } from '../api/axios';

export const AnimalService = {
  getAllAnimals: async () => {
    try {
      const response = await apiInstance.get('/api/animales/');
      return response.data;
    } catch (error:any) {
      throw error.response ? error.response.data : new Error('Error al obtener los animales');
    }
  },

  createAnimal: async (data: AnimalFormData) => {
    try {
      const response = await apiInstance.post('/api/animales/', data);
      return response.data;
    } catch (error:any) {
      throw error.response ? error.response.data : new Error('Error al registrar el animal');
    }
  }
};
