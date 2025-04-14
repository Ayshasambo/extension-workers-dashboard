import { Stack } from 'expo-router';
import React from 'react';


export default function FarmerLayout() {

  return (
    <Stack
  screenOptions={{
    headerShown: false,
  }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Livestock',
        
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          title: 'Livestock Details',
          headerShown: true
        }}
      />
      
    </Stack>
  );
}
