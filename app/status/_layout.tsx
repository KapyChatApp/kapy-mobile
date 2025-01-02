import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';

const StatusLayout = () => {
  return (
      <Stack>
          <Stack.Screen name="not-found" options={{headerShown:false}} />
    </Stack>
  )
}

export default StatusLayout;