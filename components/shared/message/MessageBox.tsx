import { View, Text } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import UserAvatar from "@/components/ui/UserAvatar";
import { bgLight510Dark10, textLight0Dark500 } from "@/styles/theme";

const MessageBox = () => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={`flex flex-row px-[20px] py-[10px] items-center w-screen ${bgLight510Dark10}`}
    >
      <UserAvatar size={48}></UserAvatar>
      <View className="flex ml-5 w-screen">
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className={`font-helvetica-bold text-14 ${textLight0Dark500}`}
        >
          Name
        </Text>
        <Text
          numberOfLines={1}
          className={`font-helvetica-light text-14 overflow-ellipsis ${textLight0Dark500}`}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="font-helvetica-light text-12 text-deny"
        >
          00:00
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MessageBox;
