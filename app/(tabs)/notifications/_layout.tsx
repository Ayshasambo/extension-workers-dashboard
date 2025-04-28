import { COLORS, FONTS } from '@/constants/theme'
import { MaterialIcons } from '@expo/vector-icons'
import { Stack } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const NotificationsLayout = () => {
  return (
    <Stack>
    <Stack.Screen name="index" 
        options={{
          title: 'Notifications',
          headerTitleStyle: {
            ...FONTS.h4,
            color: COLORS.primary, 
          },
          headerTitleAlign: 'center',

          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
          <MaterialIcons
            name="notifications"
            size={24}
            color={COLORS.primary}
          />
            </View>
          ),
        }}
        />

      <Stack.Screen name="details" options={{
          title: 'Notification Detail',
          headerTitleStyle: {
            ...FONTS.h4,
            color: COLORS.primary, 
          },
          headerTitleAlign: 'center',

          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
          <MaterialIcons
            name="notifications"
            size={24}
            color={COLORS.primary}
          />
            </View>
          ),
        }}/>
    </Stack>
  ) 
}

export default NotificationsLayout