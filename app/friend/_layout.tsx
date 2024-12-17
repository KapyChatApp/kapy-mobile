import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const FriendLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="friend-profile/[friendId]" options={{headerShown:false}}/>
        <Stack.Screen name="all-friend-rate" options={{headerShown:false}}/>
        <Stack.Screen name="mutual-friends" options={{headerShown:false}}/>
    </Stack>
  )
}

export default FriendLayout