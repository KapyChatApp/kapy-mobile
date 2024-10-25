import { View, Text } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";
import Icon from "@/components/ui/Icon";
import { TouchableOpacity } from "react-native-gesture-handler";
import UserAvatar from "@/components/ui/UserAvatar";
import { bgLight510Dark20, textLight0Dark500 } from "@/styles/theme";

const FriendBox = () => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={()=>router.push({pathname:"/(tabs)/friends/friend-profile/[friendId]", params:{friendId:1}})} className={`flex flex-row items-center p-[14px] border border-border rounded-3xl ${bgLight510Dark20}`}>
      <UserAvatar size={57}></UserAvatar>
      <View className="flex ml-[9px]">
        <Text className={`font-helvetica-bold text-14 ${textLight0Dark500}`}>Name</Text>
        <Text className={`font-helvetica-light text-12 ${textLight0Dark500}`}>2 mutual friends</Text>
        <Text className="font-helvetica-light text-[10px] text-cardinal">
          2 min ago
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FriendBox;
