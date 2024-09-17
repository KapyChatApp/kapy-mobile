import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";
import { DefaultAva } from "@/constants/DefaultAva";

const UserAvatar = ({ size,avatarURL }: any) => {
  return (
    <View className="flex">
      <Image
        source={avatarURL? avatarURL : DefaultAva.male}
        className={`rounded-full`}
        style={{height:size, width:size}}
      ></Image>
    </View>
  );
};

export default UserAvatar;
