import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const SecurityLayout= () => {
  return (
    <Stack initialRouteName='index'>
        <Stack.Screen name="index" options={{headerShown:false}}/>
        
        <Stack.Screen name="device-manager" options={{headerShown:false}}/>
        
        <Stack.Screen name="encode-message" options={{headerShown:false}}/>
        
        <Stack.Screen name="hacked" options={{headerShown:false}}/>
        
        <Stack.Screen name="sign-in-history" options={{headerShown:false}}/>
        
        <Stack.Screen name="twolayers-protector" options={{headerShown:false}}/>
    </Stack>
  )
}

export default SecurityLayout