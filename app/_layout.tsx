// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Slot, Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect } from 'react';
// import 'react-native-reanimated';
// import { AuthProvider } from '@/context/AuthContext';
// import { useColorScheme } from '@/hooks/useColorScheme';

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();



// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//     "Poppins-Italic": require('../assets/fonts/Poppins-Italic.ttf'),
//     "Poppins-Regular" : require('../assets/fonts/Poppins-Regular.ttf'),
//     "Poppins-Bold" : require('../assets/fonts/Poppins-Bold.ttf')
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return (
//       <AuthProvider>
//       {/* <Stack>
//         <Stack.Screen name="(tabs)" options={
//           {
//             headerShown: false
//           }
//         }/>
//         <Stack.Screen name="+not-found" />
//       </Stack> */}
//       <Slot />
//       </AuthProvider>
//   );
// }

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { AuthProvider } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LocationProvider } from '@/context/LocationContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Create a QueryClient instance
const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    "Poppins-Italic": require('../assets/fonts/Poppins-Italic.ttf'),
    "Poppins-Regular": require('../assets/fonts/Poppins-Regular.ttf'),
    "Poppins-Bold": require('../assets/fonts/Poppins-Bold.ttf')
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LocationProvider>
        <Slot />
        </LocationProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

