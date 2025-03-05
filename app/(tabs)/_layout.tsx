import { Tabs } from 'expo-router';
import React from 'react';
import { COLORS, FONTS } from '../../constants/theme'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialIcons } from '@expo/vector-icons';
export default function TabLayout() {

  
  return (
     // Check what value hp(1) return
    <Tabs
  screenOptions={{
    tabBarActiveTintColor: COLORS.primary,  
    tabBarInactiveTintColor: COLORS.gray, 
    tabBarStyle: {
      backgroundColor: COLORS.primary,
      width: '96%',
      paddingBottom: 5,
      paddingTop: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 11,
      position: 'absolute',   
      bottom: hp(1),             
      borderRadius: 15,        
      shadowColor: '#000',    
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3.84,
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
          headerTitle: 'L-PRES',
          
          headerStyle: {
            height: 80,

          },
          headerTitleStyle: {
            ...FONTS.h3,
            color: COLORS.primary, 
          },
          headerTitleAlign: 'left',

          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          
          <MaterialCommunityIcons
            name="translate"
            size={24}
            color={COLORS.primary}
          />

            </View>
         
              <TouchableOpacity onPress={() => console.log('Settings Pressed')}>
                <MaterialCommunityIcons
                  name="cog-outline"
                  size={24}
                  color={COLORS.primary}
                  style={{ marginRight: 15, marginLeft: 15 }}
                />
              </TouchableOpacity>
      
            </View>
          ),
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="map-marker-radius" size={24} color={focused ? COLORS.white : COLORS.white} />
          ),
        }}
      />

    
<Tabs.Screen
        name="farmers" 
        options={{
          title: 'Farmers',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="people" size={24} color={focused ? COLORS.white : COLORS.white} />
          ),
        }}
      />
    </Tabs>
  );
}

