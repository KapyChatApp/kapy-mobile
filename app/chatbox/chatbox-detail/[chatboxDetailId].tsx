import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { bgLight500Dark10 } from "@/styles/theme";
import { ScrollView } from "react-native-gesture-handler";
import ChatBoxDetailHeader from "@/components/shared/message/ChatBoxDetailHeader";
import FastMediaList from "@/components/shared/multimedia/FastMediaList";
import { useTheme } from "@/context/ThemeProviders";
import { IconURL } from "@/constants/IconURL";
import FunctionCard from "@/components/shared/function/FunctionCard";
import { MessageBoxProps } from "@/types/message";
import { getAMessageBox } from "@/lib/message-request";

const ChatBoxDetailPage = () => {
  const { chatboxDetailId } = useLocalSearchParams();
  const { theme } = useTheme();
  const [messageBox, setMessageBox] = useState<MessageBoxProps |null>(null);
  useEffect(()=>{
    const getAMessageBoxFUNC = async () => {
      const messageBox:MessageBoxProps = await getAMessageBox(chatboxDetailId);
      const messageBoxData = {
        ...messageBox,
        _id:messageBox._id,        
      }
      setMessageBox(messageBoxData);
    };

    getAMessageBoxFUNC();
  },[])
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
        showsVerticalScrollIndicator={false}
      >
         <ChatBoxDetailHeader {...messageBox}/>
        <FastMediaList label="Photos, Videos" />
        <FastMediaList label="Files" />
        <View className="flex justify-center w-full mt-[16px]" style={{rowGap:5}}>
          <FunctionCard
            label="Multimedia"
            iconURL={
              theme === "light" ? IconURL.multimedia_l : IconURL.multimedia_d
            }
            URL="/"
          />
          <FunctionCard
            label="Notification"
            iconURL={
              theme === "light" ? IconURL.bell_l : IconURL.bell_d
            }
            URL="/"
          />
          <FunctionCard
            label="Pin"
            iconURL={
              theme === "light" ? IconURL.pin_l : IconURL.pin_d
            }
            URL="/"
          />
          <FunctionCard
            label="Share contact information"
            iconURL={
              theme === "light" ? IconURL.visit_card_l : IconURL.visit_card_d
            }
            URL="/"
          />
          <FunctionCard
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
