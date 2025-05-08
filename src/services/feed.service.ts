import { FeedForm} from '../types/global';
import { apiInstance } from '../api/axios';
import { API_ENDPOINTS } from '../api/endpoints';

export const FeedService = {
  getFeedByAnimal: async (id: string) => {
    try {
      const response = await apiInstance.get(API_ENDPOINTS.FEED.GETANIMALFEED(id));
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Error al obtener la vacuna');
    }
  },

  createFeed: async (data: FeedForm) => {
    try {
      const response = await apiInstance.post(API_ENDPOINTS.FEED.CREATE, data);
      return response;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Error al registrar la vacuna');
    }
  },
};
