import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://l-press-backend.onrender.com';

// const postDynamicData = async <T, D>(endpoint: string, data: D): Promise<T> => {
//   const response = await axios.post<T>(`${BASE_URL}${endpoint}`, data);
//   return response.data;
// };
const postDynamicData = async <T, D>(endpoint: string, data: D): Promise<T> => {
  const response = await axios.post<T>(
    `${BASE_URL}${endpoint}`,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      }
    }
  );
  return response.data;
};

export const usePostData = <T, D>(endpoint: string) => {
  return useMutation({
    mutationFn: (data: D) => postDynamicData<T, D>(endpoint, data),
  });
};
