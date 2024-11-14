import { AnimalFormData, RazasForm, SpeciesForm } from '../types/global';
import { apiInstance } from '../api/axios';

export const AnimalService = {
  // Métodos para Animales
  getAllAnimals: async () => {
    try {
      const response = await apiInstance.get('/api/animales/');
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Error al obtener los animales');
    }
  },

  getAnimalById: async (id: string | number) => {
    try {
      const response = await apiInstance.get(`/api/animales/${id}/`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Error al obtener el animal');
    }
  },

  createAnimal: async (data: AnimalFormData) => {
    try {
      const response = await apiInstance.post('/api/animales/', data);
      return response;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Error al registrar el animal');
    }
  },

  // Métodos para Especies
  getAllEspecies: async () => {
    try {
      const response = await apiInstance.get('/api/especies/');
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Error al obtener las especies');
    }
  },
  createSpecies: async (data: SpeciesForm) => {
    try {
      const response = await apiInstance.post('/api/especies/', data);
      return response;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Error al obtener las especies');
    }
  },

  getEspecieById: async (id: string | number) => {
    try {
      const response = await apiInstance.get(`/api/especies/${id}/`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Error al obtener la especie');
    }
  },

  // Métodos para Razas
  getAllRazas: async () => {
    try {
      const response = await apiInstance.get('/api/razas/');
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Error al obtener las razas');
    }
  },

  getRazaById: async (id: string | number) => {
    try {
      const response = await apiInstance.get(`/api/razas/${id}/`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Error al obtener la raza');
    }
  },

  createRazas: async (data: RazasForm) => {
    try {
      const response = await apiInstance.post('/api/razas/', data);
      return response;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Error al obtener las especies');
    }
  },
};