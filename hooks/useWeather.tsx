import { useQuery } from "@tanstack/react-query";

const API_KEY = "134ec31d7fbaa98f376222ce742001b2"; 

type WeatherData = {
  name: string;
  main: { temp: number };
  weather: { main: string; icon: string }[];
};

export const useWeather = (latitude?: number, longitude?: number) => {
  return useQuery<WeatherData>({
    queryKey: ["weather", latitude, longitude],
    queryFn: async () => {
      if (latitude === undefined || longitude === undefined) {
        throw new Error("Latitude and Longitude are required");
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather");
      }

      return response.json();
    },
    enabled: !!latitude && !!longitude, // Run only when coords are available
    staleTime: 5 * 60 * 1000, // cache for 5 mins
  });
};
