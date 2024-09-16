import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const HomeLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="message" options={{headerShown:false}}></Stack.Screen>
    </Stack>
  )
}

export default HomeLayout