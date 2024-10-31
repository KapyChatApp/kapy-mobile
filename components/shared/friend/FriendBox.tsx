import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router, useRouter } from "expo-router";
import Icon from "@/components/ui/Icon";
import { TouchableOpacity } from "react-native-gesture-handler";
import UserAvatar from "@/components/ui/UserAvatar";
import { bgLight510Dark20, textLight0Dark500 } from "@/styles/theme";
import { FriendBoxProps } from "@/types/friend";
import { IconURL } from "@/constants/IconURL";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { addFriend } from "@/requests/add-request";
import CustomButton from "@/components/ui/CustomButton";
import friends from "@/app/(tabs)/friends";
const FriendBox = (props: FriendBoxProps) => {
  const router = useRouter();
  const [friendIds, setFriendIds] = useState<string[]>([]);
  const [relation, setRelation] = useState(props.relation);
  console.log("result: ", props);
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/(tabs)/friends/friend-profile/[friendId]",
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
        <Text className={`font-helvetica-light text-12 ${textLight0Dark500}`}>
          {props.mutualFriends} mutual friends
        </Text>
        <Text className="font-helvetica-light text-[10px] text-cardinal">
          {props.onlineTime} min ago
        </Text>
      </View>
    
    </TouchableOpacity>
  );
};

export default FriendBox;
