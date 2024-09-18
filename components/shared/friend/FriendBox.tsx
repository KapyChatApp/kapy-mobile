import { View, Text } from "react-native";
import React from "react";
import UserAvatar from "@/components/ui/UserAvatar";
import { Link } from "expo-router";
import Icon from "@/components/ui/Icon";
import { TouchableOpacity } from "react-native-gesture-handler";

const FriendBox = () => {
  return (
    <TouchableOpacity className="flex flex-row items-center p-[14px] border border-border rounded-3xl">
      <UserAvatar size={57}></UserAvatar>
      <View className="flex ml-[9px]">
        <Text className="font-helvetica-bold text-14 -mb-[4px]">Name</Text>
        <Text className="font-helvetica-light text-12">2 mutual friends</Text>
        <Text className="font-helvetica-light text-[10px] text-cardinal">2 min ago</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FriendBox;
