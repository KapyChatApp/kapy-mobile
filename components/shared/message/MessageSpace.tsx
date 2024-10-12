import { View, Text, ScrollView } from "react-native";
import React from "react";
import { bgLight500Dark10 } from "@/styles/theme";

const MessageSpace = () => {
  return (
    <View className="flex-1" >
      <ScrollView className={` ${bgLight500Dark10} flex-1`}>
      </ScrollView>
    </View>
  );
};

export default MessageSpace;
