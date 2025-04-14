import { Stack } from 'expo-router';
import React from 'react';
import { COLORS, FONTS } from '@/constants/theme'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function FarmerLayout() {

  return (
    <Stack
  screenOptions={{
    headerShown: false,
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
          title: 'Farmer Details',
          headerShown: true
        }}
      />
      <Stack.Screen
        name="livestock"
        options={{
          title: 'Livestock',
        }}
      />
      
    </Stack>
  );
}
