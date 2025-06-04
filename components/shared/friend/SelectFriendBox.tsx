import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import UserAvatar from "@/components/ui/UserAvatar";
import { bgLight510Dark20, textLight0Dark500 } from "@/styles/theme";
import { SelectFriendBoxProps } from "@/types/friend";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";

const SelectFriendBox = (props: SelectFriendBoxProps) => {
  const { isSelected, onSelect, onUnSelect, isDisable } = props;

  const handlePress = () => {
    if (isDisable) return;
    if (isSelected) {
      onUnSelect?.(props);
    } else {
      onSelect?.(props);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={isDisable ? 1 : 0.7}
      onPress={handlePress}
      className={`w-full ${bgLight510Dark20} px-[20px] py-[12px]`}
    >
      <View className="flex flex-row items-center justify-between gap-[10px]">
        {/* Avatar + Name */}
        <View className="flex flex-row items-center gap-[10px] flex-1">
          <UserAvatar avatarURL={{ uri: props.avatar }} size={40} />
          <Text className={`font-helvetica-bold text-14 ${textLight0Dark500}`}>
            {props.firstName + " " + props.lastName}
          </Text>
        </View>

        {/* Icon chọn */}
        <Icon
          iconURL={
            isDisable
              ? IconURL.selected
              : isSelected
              ? IconURL.selected
              : IconURL.non_select
          }
          size={20}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SelectFriendBox;
