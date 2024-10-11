import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import ChatBoxHeader from "@/components/shared/message/ChatBoxHeader";
import TypingSpace from "@/components/shared/message/TypingSpace";
import MessageSpace from "@/components/shared/message/MessageSpace";
import { ScrollView } from "react-native-gesture-handler";
import { bgLight500Dark10 } from "@/styles/theme";

const MessageDetailPage = () => {
  const { messageId } = useLocalSearchParams();
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"} 
    style={{ flex: 1 }}
  >
      <SafeAreaView className="flex-1 ">
        <ChatBoxHeader />
        <ScrollView
          className={`h-full w-full ${bgLight500Dark10}`}
        ></ScrollView>
        <TypingSpace />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default MessageDetailPage;
