import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const CommunityLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="post-detail/[postId]" options={{headerShown:false}}/>
        <Stack.Screen name="create-post" options={{headerShown:false}}/>
        <Stack.Screen name="edit-post" options ={{headerShown:false}}/>
        <Stack.Screen name="not-found" options={{headerShown:false}}/>
    </Stack>
  )
}

export default CommunityLayout