import { View, Text, ScrollView } from "react-native";
import React from "react";
import { bgLight500Dark10 } from "@/styles/theme";
import Message from "./Message";

const MessageSpace = () => {
  return (
    <View className="flex-1"  >
      <ScrollView className={` ${bgLight500Dark10} flex-1 flex`} contentContainerStyle={{rowGap:3, padding:2}}>
        <Message isSender={false} position="top" content="Hello"/>
        <Message isSender={false} position="bottom" content="How r u today?"/>
        <Message isSender={true} position="top" content="Pretty good!"/>
        <Message isSender={true} position="middle" content="How about u and Jessica?"/>
        <Message isSender={true} position="middle" content="Long time no see every one"/>
        <Message isSender={true} position="bottom" content="Miss every body so much!"/>
      </ScrollView>
    </View>
  );
};

export default MessageSpace;
