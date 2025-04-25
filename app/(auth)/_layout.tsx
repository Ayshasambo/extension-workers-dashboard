import { Stack } from 'expo-router';

export default function AuthLayout() {
  
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="index"
        options={{ headerShown: false,
          title: 'Login'
        }}
      />

  <Stack.Screen
        name="forgotpassword"
        options={{ headerShown: false,
          title: 'Register'
        }}
      />

  <Stack.Screen
        name="resetpassword"
        options={{ headerShown: false,
          title: 'Register'
        }}
      />

      <Stack.Screen
        name="register"
        options={{ headerShown: false,
          title: 'Register'
        }}
      />

  <Stack.Screen
        name="successfulregistration"
        options={{ headerShown: true,
          title: 'Register Successful'
        }}
      />
  <Stack.Screen
        name="inner"
        options={{ headerShown: true,
          title: 'Home'
        }}
      />
    </Stack>
  );
}
