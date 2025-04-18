import { View, Text } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import UserAvatar from "@/components/ui/UserAvatar";
import { bgLight510Dark20, textLight0Dark500 } from "@/styles/theme";
import { FriendBoxProps } from "@/types/friend";
const FriendBox = (props: FriendBoxProps) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/friend/friend-profile/[friendId]",
          params: { friendId: props._id },
        })
      }
      className={`flex flex-row items-center p-[14px] border border-border rounded-3xl ${bgLight510Dark20}`}
    >
      <UserAvatar avatarURL={{ uri: props.avatar }} size={57}></UserAvatar>
      <View className="flex ml-[9px] flex-1">
        <Text className={`font-helvetica-bold text-14 ${textLight0Dark500}`}>
          {props.firstName + " " + props.lastName}
        </Text>
        {props.mutualFriends && props.mutualFriends.length>0? <Text className={`font-helvetica-light text-12 ${textLight0Dark500}`}>
          {props.mutualFriends?.length} mutual friends
        </Text>:null}
      </View>
    </TouchableOpacity>
  );
};

export default FriendBox;
