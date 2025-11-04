import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Use the same base URL as GETs to avoid environment mismatches
const BASE_URL = 'https://l-press-backend-b5fxazbkc9hadjbg.southafricanorth-01.azurewebsites.net';

// const postDynamicData = async <T, D>(endpoint: string, data: D): Promise<T> => {
//   const response = await axios.post<T>(`${BASE_URL}${endpoint}`, data);
//   return response.data;
// };
const postDynamicData = async <T, D>(endpoint: string, data: D): Promise<T> => {
  const token = await AsyncStorage.getItem('token');
  const response = await axios.post<T>(
    `${BASE_URL}${endpoint}`,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }
  );
  return response.data;
};

export const usePostData = <T, D>(endpoint: string) => {
  return useMutation({
    mutationFn: (data: D) => postDynamicData<T, D>(endpoint, data),
  });
};
