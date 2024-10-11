import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import ChatBoxHeader from '@/components/shared/message/ChatBoxHeader';

const MessageDetailPage = () => {
    const {messageId}=useLocalSearchParams();
  return (
    <SafeAreaView>
      <ChatBoxHeader/>
    </SafeAreaView>
  )
}

export default MessageDetailPage