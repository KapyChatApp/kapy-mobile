import { View, Text, ScrollView } from "react-native";
import React from "react";
import { bgLight500Dark10 } from "@/styles/theme";
import Message from "./Message";

const MessageSpace = () => {
  return (
    <View className="flex-1"  >
      <ScrollView className={` ${bgLight500Dark10} flex-1 flex`} contentContainerStyle={{rowGap:3}}>
        <Message isSender={false} position="top"/>
        <Message isSender={false} position="middle"/>
        <Message isSender={false} position="middle"/>
        <Message isSender={false} position="bottom"/>
        <Message isSender={true} position="top"/>
        <Message isSender={true} position="middle"/>
        <Message isSender={true} position="middle"/>
        <Message isSender={true} position="bottom"/>
      </ScrollView>
    </View>
  );
};

export default MessageSpace;
