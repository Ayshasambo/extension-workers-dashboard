import { Tabs } from 'expo-router';
import React from 'react';
import { COLORS, FONTS } from '../../constants/theme'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TouchableOpacity, View } from 'react-native';
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

          // headerRight: () => (
          //   <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            
          // <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          //   </View>
         
          //     <TouchableOpacity onPress={() => console.log('Settings Pressed')}>
          //       <MaterialCommunityIcons
          //         name="cog-outline"
          //         size={24}
          //         color={COLORS.primary}
          //         style={{ marginRight: 15, marginLeft: 15 }}
          //       />
          //     </TouchableOpacity>
      
          //   </View>
          // ), 
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="map-marker-radius" size={24} color={focused ? COLORS.white : COLORS.white} />
          ),
        }}
      />

    <Tabs.Screen
      name="resources"
      options={{
        headerShown: false,
        title: 'Resources',
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons name="forest" size={24} color={focused ? COLORS.white : COLORS.white} />
        ),
      }}
      />

  <Tabs.Screen
        name="notifications"

        options={{
          headerShown: false,
          title: 'Notifications',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="bell" size={24} color={focused ? COLORS.white : COLORS.white} />
          ),
        }}
      />

  <Tabs.Screen
        name="faq"
        options={{
          title: 'FAQ',
          headerStyle: {
            height: 80,

          },
          headerTitleStyle: {
            ...FONTS.h4, 
            color: COLORS.primary, 
          },
          headerTitleAlign: 'center',

          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
          <MaterialIcons
            name="question-answer"
            size={24}
            color={COLORS.primary}
          />
            </View>
          ),
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="frequently-asked-questions" size={24} color={focused ? COLORS.white : COLORS.white} />
          ),
        }}
      />
      
    </Tabs>
  );
}
