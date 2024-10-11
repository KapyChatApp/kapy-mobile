import { View, Text } from 'react-native'
import React from 'react'
import { bgLight500Dark10 } from '@/styles/theme'

const MessageSpace = () => {
  return (
    <View className={`flex-1 w-full h-full ${bgLight500Dark10}`}>
      <Text>MessageSpace</Text>
      <Text>XXX</Text>
    </View>
  )
}

export default MessageSpace