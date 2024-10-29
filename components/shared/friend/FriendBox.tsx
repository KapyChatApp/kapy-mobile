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
const FriendBox = (props: FriendBoxProps) => {
  const router = useRouter();
  const [isSentRequest, setIsSentRequest] = useState(false);
  const [friendIds, setFriendIds] = useState<string[]>([]);
  useEffect(() => {
    const getFiendIds = async () => {
      const user = await AsyncStorage.getItem("user");
      if (!user) {
        throw new Error("You are unauthenticated!");
      }
      const { friendIds } = JSON.parse(user);
      setFriendIds(friendIds);
    };
  });
  const handleFriendRequest = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const user = await AsyncStorage.getItem("user");
      if (!user) {
        throw new Error("You are unauthenticated!");
      }
      const { _id } = JSON.parse(user);
      const friendRequestBody = { sender: _id, receiver: props._id };
      const response = await axios.post(
        process.env.EXPO_PUBLIC_BASE_URL + "/request/friend",
        friendRequestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        Alert.alert("Sent your request!");
        setIsSentRequest(true);
      } else {
        Alert.alert(`Your request fail ${response.statusText} `);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  console.log(props);
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
      {props.relation === "stranger" ? (
        <TouchableOpacity onPress={handleFriendRequest}>
          <Icon size={40} iconURL={IconURL.add_friend} />
        </TouchableOpacity>
      ) : props.relation === "pending" || isSentRequest ? (
        <Icon iconURL={IconURL.sent_request} size={38} />
      ) : (
        <Icon iconURL={IconURL.is_friend} size={28} />
      )}
    </TouchableOpacity>
  );
};

export default FriendBox;
