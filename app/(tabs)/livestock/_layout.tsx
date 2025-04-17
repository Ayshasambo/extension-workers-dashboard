import { Stack } from 'expo-router';
import React from 'react';


export default function LivestockLayout() {

  return (
    <Stack
  screenOptions={{
    headerShown: true,
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
          title: 'Livestock Manager Details',
          headerShown: false
        }}
      />
      
    </Stack>
  );
}
