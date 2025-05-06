// hooks/useDataById.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://l-press-backend.onrender.com';

export const useDataById = <T>(endpoint: string, id: string) => {
  return useQuery({
    queryKey: [endpoint, id],
    queryFn: async () => {
      const { data } = await axios.get<T>(`${BASE_URL}/${endpoint}/${id}`);
      return data;
    },
    enabled: !!id, // only runs when id is available
  });
};
