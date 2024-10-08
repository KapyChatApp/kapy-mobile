import { View, Text } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import UserAvatar from "@/components/ui/UserAvatar";

const MessageBox = () => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="flex flex-row px-[20px] py-[10px] items-center w-screen"
    >
      <UserAvatar size={48}></UserAvatar>
      <View className="flex ml-5 w-screen">
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="font-helvetica-bold text-14"
        >
          Name
        </Text>
        <Text
          numberOfLines={1}
          className="font-helvetica-light text-14 overflow-ellipsis"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
          similique, fugit quisquam eum dignissimos, laboriosam maiores deserunt
          numquam earum tempora reiciendis cupiditate necessitatibus totam
          eligendi labore natus est repellat veniam.
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
