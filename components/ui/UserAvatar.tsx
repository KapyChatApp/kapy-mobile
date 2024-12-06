import { View, Text, Image } from "react-native";
import React from "react";
import { DefaultAva } from "@/constants/DefaultAva";
import { bgLight500Dark10 } from "@/styles/theme";

const UserAvatar = ({ size, avatarURL }: any) => {
  const imageSource = avatarURL && avatarURL.uri ? avatarURL : DefaultAva.user;
  return (
    <View className="flex">
      <Image
        source={imageSource}
        className={`rounded-full ${bgLight500Dark10}`}
        style={{ height: size, width: size }}
      />
    </View>
  );
};

export default UserAvatar;
