import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://l-press-backend.onrender.com';

export const useDataWithQuery = <T>(endpoint: string, params: Record<string, string>) => {
  return useQuery({
    queryKey: [endpoint, params],
    queryFn: async () => {
      const { data } = await axios.get<T>(`${BASE_URL}/${endpoint}`, { params });
      return data;
    },
    enabled: !!params,
  });
};
