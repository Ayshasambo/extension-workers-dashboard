import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://l-press-backend.onrender.com';

const deleteLivestockById = async(id: string) => {
  const response = await axios.delete(`${BASE_URL}/animals/${id}`);
  return response.data;
};

export const useDeleteLivestock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLivestockById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['animals'] }); 
    },
  });
};


