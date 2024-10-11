import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const MessageDetailPage = () => {
    const {messageId}=useLocalSearchParams();
  return (
    <View>
      <Text>Message {messageId}</Text>
    </View>
  )
}

export default MessageDetailPage