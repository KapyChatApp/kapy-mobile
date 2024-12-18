import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import Icon from "@/components/ui/Icon";
import { TouchableOpacity } from "react-native-gesture-handler";
import UserAvatar from "@/components/ui/UserAvatar";
import { bgLight510Dark20, textLight0Dark500 } from "@/styles/theme";
import { FriendBoxProps } from "@/types/friend";
import { IconURL } from "@/constants/IconURL";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { addFriend } from "@/lib/add-request";
import CustomButton from "@/components/ui/CustomButton";
const FriendFindBox = (props: FriendBoxProps) => {
  const router = useRouter();
  const [friendIds, setFriendIds] = useState<string[]>([]);
  const [relation, setRelation] = useState(props.relation);
  console.log("result: ", props);
  const RenderFriendBoxButton = () => {
    switch (relation) {
      case "friend":
        return <Icon iconURL={IconURL.is_friend} size={28} />;
      case "bff":
        return <Icon iconURL={IconURL.is_bff} size={28} />;
      case "sent_bff":
        return (
          <CustomButton width={80} height={30} label="Accept" type={true} />
        );
      case "sent_friend":
        return <CustomButton width={80} height={30} label="Accept" />;
      case "received_bff":
        return (
          <TouchableOpacity>
            <Icon iconURL={IconURL.pending_bff} size={28} />
          </TouchableOpacity>
        );
      case "received_friend":
        return (
          <TouchableOpacity>
            <Icon iconURL={IconURL.pending_friend} size={28} />
          </TouchableOpacity>
        );
      default:
        return (
          <TouchableOpacity>
            <Icon iconURL={IconURL.add_friend} size={28} />
          </TouchableOpacity>
        );
    }
  };
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
        <Text className={`font-helvetica-light text-12 ${textLight0Dark500}`}>
          {props.mutualFriends?.length} mutual friends
        </Text>
        <Text className="font-helvetica-light text-[10px] text-cardinal">
          {props.onlineTime} min ago
        </Text>
      </View>
  
    </TouchableOpacity>
  );
};

export default FriendFindBox;
