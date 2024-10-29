import { View, Text, Image, Alert } from "react-native";
import React from "react";
import RequestButton from "@/components/ui/RequestButton";
import { IconURL } from "@/constants/IconURL";
import UserAvatar from "@/components/ui/UserAvatar";
import { bgLight510Dark20, textLight0Dark500 } from "@/styles/theme";
import { RequestedProps } from "@/types/friend";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const FastRequestBox = (props: RequestedProps) => {
  const acceptFriendReq = async (token: string, userId: string) => {
    try {
      const acceptBody = { sender: props._id, receiver: userId };
      const response = await axios.post(
        process.env.EXPO_PUBLIC_BASE_URL + "/request/accept-friend",
        acceptBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      if (response.status == 200 || response.status == 201) {
        Alert.alert("Accepted!");
      } else {
        Alert.alert("Cannot accept now!");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const acceptBFFReq = async (token: string, userId: string) => {
    try {
      const acceptBody = { sender: props._id, receiver: userId };
      const response = await axios.post(
        process.env.EXPO_PUBLIC_BASE_URL + "/request/accept-bff",
        acceptBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      if (response.status == 200 || response.status == 201) {
        Alert.alert("Accepted!");
      } else {
        Alert.alert("Cannot accept now!");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const handleAccept = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("You are unauthenticated!");
    }
    const user = await AsyncStorage.getItem("user");
    if (!user) {
      throw new Error("User not found!");
    }
    const { _id } = JSON.parse(user);
    if (props.relation === "bff") {
      acceptBFFReq(token, _id);
    } else if (props.relation === "friend") {
      acceptFriendReq(token, _id);
    }
  };
  return (
    <View
      className={`w-[209px] h-[97px] flex flex-row border border-border rounded-3xl items-center justify-center p-[13px] ${bgLight510Dark20}`}
    >
      <UserAvatar avatarURL={{ uri: props.avatar }} size={70}></UserAvatar>
      <View className="info-container flex ml-[16px]">
        <Text className={`font-helvetica-bold text-14 ${textLight0Dark500}`}>
          {props.lastName}
        </Text>
        <Text
          className={`font-helvetica-light text-12 mb-[6px] ${textLight0Dark500}`}
        >
          Message
        </Text>
        <RequestButton
          type={props.relation === "bff" ? true : false}
          width={93}
          height={31}
          onPress={handleAccept}
        ></RequestButton>
      </View>
      <Image
        className="w-[18px] h-[18px] absolute top-[13px] right-[13px]"
        source={
          props.relation === "bff" ? IconURL.bff_request : IconURL.f_request
        }
      ></Image>
    </View>
  );
};

export default FastRequestBox;
