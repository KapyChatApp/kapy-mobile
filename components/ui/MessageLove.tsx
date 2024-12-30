import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "./Icon";
import { IconURL } from "@/constants/IconURL";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";

const MessageLove = ({
  onPress,
  isLiked,
  likedArray,
}: {
  onPress: () => void;
  isLiked: boolean;
  likedArray: string[];
}) => {
  return (
    <View className="">
      <TouchableOpacity
        className={`px-[4px] h-[24px] bg-light-310 dark:bg-dark-20 rounded-3xl flex items-center justify-center flex-row`}
        style={{ columnGap: 2 }}
        onPress={onPress}
      >
        <Icon iconURL={isLiked ? IconURL.loved : IconURL.love} size={12} />
        {likedArray.length > 0 ? (
          <Text className={`text-10 font-helvetica-bold ${textLight0Dark500}`}>
            {likedArray.length}
          </Text>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default MessageLove;
