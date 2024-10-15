import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ChatBoxDetailLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="[chatboxDetailId]" options={{headerShown:false}}/>
    </Stack>
  )
}

export default ChatBoxDetailLayout