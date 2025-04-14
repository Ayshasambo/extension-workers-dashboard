import { Tabs } from 'expo-router';
import React from 'react';
import { COLORS, FONTS } from '../../constants/theme'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {

  return (
    <Tabs
  screenOptions={{
    tabBarActiveTintColor: COLORS.primary,  
    tabBarInactiveTintColor: COLORS.gray, 
    tabBarStyle: {
      backgroundColor: COLORS.primary,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',      
      shadowColor: '#000',  
      elevation: 5,
    },

    tabBarLabelStyle: {
      color: COLORS.white, 
    },
    headerShown: true,
  }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerTitle: 'LivRes',
          
          headerStyle: {
            height: 50,

          },
          headerTitleStyle: {
            ...FONTS.h3,
            color: COLORS.primary, 
          },
          headerTitleAlign: 'left',

          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="map-marker-radius" size={24} color={focused ? COLORS.white : COLORS.white} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="livestock"
        options={{
          title: 'Livestock',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="pets" size={24} color={focused ? COLORS.white : COLORS.white} />
          ),
        }}
      />

      <Tabs.Screen
        name="farmers"
        options={{
          title: 'Farmers',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="groups" size={24} color={focused ? COLORS.white : COLORS.white} />
          ),
        }}
      />
      
    </Tabs>
  );
}
