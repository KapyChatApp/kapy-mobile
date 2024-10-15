import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Previous from "@/components/ui/Previous";
import { SafeAreaView } from "react-native-safe-area-context";
import { bgLight500Dark10 } from "@/styles/theme";
import { ScrollView } from "react-native-gesture-handler";
import ChatBoxDetailHeader from "@/components/shared/message/ChatBoxDetailHeader";
import FastMediaList from "@/components/shared/multimedia/FastMediaList";
import DetailChatFunctionCard from "@/components/shared/function/DetailChatFunctionCard";
import { useTheme } from "@/context/ThemeProviders";
import { IconURL } from "@/constants/IconURL";

const ChatBoxDetailPage = () => {
  const { chatboxDetailId } = useLocalSearchParams();
  const { theme } = useTheme();
  return (
    <SafeAreaView className={`${bgLight500Dark10} flex-1`}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        padding:16,
        }}
      >
        <ChatBoxDetailHeader />
        <FastMediaList label="Photos, Videos" />
        <FastMediaList label="Files" />
        <View className="flex justify-center w-full mt-[16px]" style={{rowGap:5}}>
          <DetailChatFunctionCard
            label="Multimedia"
            iconURL={
              theme === "light" ? IconURL.multimedia_l : IconURL.multimedia_d
            }
            URL="/"
          />
          <DetailChatFunctionCard
            label="Notification"
            iconURL={
              theme === "light" ? IconURL.bell_l : IconURL.bell_d
            }
            URL="/"
          />
          <DetailChatFunctionCard
            label="Pin"
            iconURL={
              theme === "light" ? IconURL.pin_l : IconURL.pin_d
            }
            URL="/"
          />
          <DetailChatFunctionCard
            label="Share contact information"
            iconURL={
              theme === "light" ? IconURL.visit_card_l : IconURL.visit_card_d
            }
            URL="/"
          />
          <DetailChatFunctionCard
            label="Block"
            iconURL={
              theme === "light" ? IconURL.block_l : IconURL.block_d
            }
            URL="/"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatBoxDetailPage;
