import { View, Text } from "react-native";
import React from "react";
import UserAvatar from "@/components/ui/UserAvatar";
import { bgLight510Dark20, textLight0Dark500 } from "@/styles/theme";
import { FriendBoxProps } from "@/types/friend";
const FriendBoxNonEvent = (props: FriendBoxProps) => {
  console.log("result: ", props);
  return (
    <View
      className={`flex flex-row items-center p-[14px] border border-border rounded-3xl ${bgLight510Dark20}`}
    >
      <UserAvatar avatarURL={{ uri: props.avatar }} size={57}></UserAvatar>
      <View className="flex ml-[9px] flex-1">
        <Text className={`font-helvetica-bold text-14 ${textLight0Dark500}`}>
          {props.firstName + " " + props.lastName}
        </Text>
        <Text className="font-helvetica-light text-[10px] text-cardinal">
          {props.onlineTime} min ago
        </Text>
      </View>
    
    </View>
  );
};

export default FriendBoxNonEvent;
