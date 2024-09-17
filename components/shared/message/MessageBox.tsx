import { View, Text } from "react-native";
import React, { useState } from "react";
import UserAvatar from "@/components/ui/UserAvatar";
import { TouchableOpacity } from "react-native-gesture-handler";

const MessageBox = () => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="flex flex-row px-[20px] py-[10px] items-center"
    >
      <UserAvatar size={48}></UserAvatar>
      <View className="flex ml-5">
        <Text className="font-helvetica-bold text-14 -mb-[2px]">Name</Text>
        <Text className="font-helvetica-light text-14 -mb-[2px]">
          Current message will be like this!
        </Text>
        <Text className="font-helvetica-light text-12">00:00</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MessageBox;
