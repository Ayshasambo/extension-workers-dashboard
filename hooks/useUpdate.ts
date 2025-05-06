// hooks/useUpdate.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://l-press-backend.onrender.com';

interface UpdateArgs<T> {
  id: string;
  data: Partial<T>;
}

export function useUpdateById<T>(endpoint: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: UpdateArgs<T>) => {
      const response = await axios.patch<T>(`${BASE_URL}/${endpoint}/${id}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      //queryClient.invalidateQueries([endpoint, variables.id]);
      queryClient.invalidateQueries({ queryKey: [endpoint, variables.id] });
    },
  });
}
