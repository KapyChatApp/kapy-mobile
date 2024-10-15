import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Previous from "@/components/ui/Previous";
import { SafeAreaView } from "react-native-safe-area-context";
import { bgLight500Dark10 } from "@/styles/theme";
import { ScrollView } from "react-native-gesture-handler";
import ChatBoxDetailHeader from "@/components/shared/message/ChatBoxDetailHeader";

const ChatBoxDetailPage = () => {
  const { chatboxDetailId } = useLocalSearchParams();
  return (
    <SafeAreaView className={`${bgLight500Dark10} flex-1`}>
      <ScrollView className="flex-1">
        <ChatBoxDetailHeader/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatBoxDetailPage;
