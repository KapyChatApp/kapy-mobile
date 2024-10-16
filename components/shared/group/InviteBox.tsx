import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import UserAvatar from "@/components/ui/UserAvatar";
import { bgLight510Dark20, textLight0Dark500 } from "@/styles/theme";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";

const InviteBox = ({ isInvited }: any) => {
  return (
    <View
      className={`flex flex-row items-center p-[14px] border border-border rounded-3xl ${bgLight510Dark20}`}
    >
      <UserAvatar size={57}></UserAvatar>
      <View className="flex ml-[9px] flex-1">
        <Text className={`font-helvetica-bold text-14 ${textLight0Dark500}`}>
          Name
        </Text>
        <Text className={`font-helvetica-light text-12 ${textLight0Dark500}`}>
          2 mutual friends
        </Text>
      </View>
      <TouchableOpacity className="mr-[10px]">
        <Icon iconURL={isInvited ? IconURL.added : IconURL.addmem} size={28} />
      </TouchableOpacity>
    </View>
  );
};

export default InviteBox;
