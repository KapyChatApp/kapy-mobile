import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const  ChatBoxLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="[messageId]" options={{headerShown:false}}/>
        <Stack.Screen name="chatbox-detail" options={{headerShown:false}}/>
    </Stack>
  )
}

export default ChatBoxLayout