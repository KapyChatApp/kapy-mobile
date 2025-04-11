import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FriendBoxProps } from "@/types/friend";
import { bgLight510Dark20, textLight0Dark500 } from "@/styles/theme";
import Icon from "@/components/ui/Icon";
import UserAvatar from "@/components/ui/UserAvatar";
import { IconURL } from "@/constants/IconURL";

const EditSelectedFriendBox = ({
  data,
  isSelected,
}: {
  data: FriendBoxProps;
  isSelected: boolean;
}) => {
  return (
    <View
      className={`flex flex-row items-center p-[12px] px-[20px] w-full ${bgLight510Dark20}`}
    >
      <View className="flex flex-row items-center">
        <UserAvatar avatarURL={{ uri: data.avatar }} size={40}></UserAvatar>
        <View className="flex ml-[9px] flex-1">
          <Text className={`font-helvetica-bold text-14 ${textLight0Dark500}`}>
            {data.firstName + " " + data.lastName}
          </Text>
        </View>
        {isSelected? (
          <Icon iconURL={IconURL.selected} size={20} />
        ) : (
          <Icon
            iconURL={isSelected ? IconURL.selected : IconURL.non_select}
            size={20}
          />
        )}
      </View>
    </View>
  );
};

export default EditSelectedFriendBox;
