import { Stack } from 'expo-router';
import React from 'react';


export default function FarmerLayout() {

  return (
    <Stack
  screenOptions={{
    headerShown: true,
  }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Farmers',
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          title: 'Farmer',
          headerShown: true
        }}
      />
      <Stack.Screen
        name="livestock"
        options={{
          title: 'Farmers Livestock',

        }}
      />
      <Stack.Screen
        name="vaccination"
        options={{
          title: 'Vaccination',
          
        }}
      />
    </Stack>
  );
}
