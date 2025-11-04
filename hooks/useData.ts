import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://l-press-backend-b5fxazbkc9hadjbg.southafricanorth-01.azurewebsites.net/';

const fetchDynamicData = async <T>(endpoint: string): Promise<T> => {
  const response = await axios.get<T>(`${BASE_URL}${endpoint}`);
  return response.data;
};

export const useData = <T>(endpoint: string) => {
  return useQuery({
    queryKey: ['pressData', endpoint],
    queryFn: () => fetchDynamicData<T>(endpoint),
    enabled: !!endpoint,
  });
};
