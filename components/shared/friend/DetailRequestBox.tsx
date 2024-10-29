import { View, Text, Image, Alert } from "react-native";
import React from "react";
import RequestButton from "@/components/ui/RequestButton";
import DenyButton from "@/components/ui/DenyButton";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
import UserAvatar from "@/components/ui/UserAvatar";
import { bgLight510Dark20, textLight0Dark500 } from "@/styles/theme";
import { RequestedProps } from "@/types/friend";
import { formatDate } from "@/utils/DateFormatter";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailRequestBox = (props: RequestedProps) => {
  const acceptFriendReq = async (token: string, userId: string) => {
    try {
      const acceptBody = { sender: props._id, receiver: userId };
      const response = await axios.post(
        process.env.EXPO_PUBLIC_BASE_URL + "/request/acccept-friend",
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
        process.env.EXPO_PUBLIC_BASE_URL + "/request/acccept-bff",
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
      className={`flex flex-row border border-border p-[14px] rounded-3xl items-center justify-between relative ${bgLight510Dark20}`}
    >
      <View className="absolute -top-[14px] -left-[8px] z-">
        <Icon
          size={32}
          iconURL={
            props.relation === "bff" ? IconURL.bff_request : IconURL.f_request
          }
        ></Icon>
      </View>
      <View className="flex flex-row items-center">
        <UserAvatar avatarURL={{ uri: props.avatar }} size={57}></UserAvatar>
        <View className="ml-[9px]">
          <Text className={`font-helvetica-bold text-14 ${textLight0Dark500}`}>
            {props.firstName + " " + props.lastName}
          </Text>
          <Text className={`font-helvetica-light text-12 ${textLight0Dark500}`}>
            mutual friends
          </Text>
          <Text className="font-helvetica-light text-[10px] text-cardinal">
            Send request at {formatDate(props.createAt)}
          </Text>
        </View>
      </View>
      <View className=" flex items-center justify-center">
        <View className="flex flex-row items-center justify-center">
          <DenyButton label="Deny" width={70} height={40}></DenyButton>
          <View className="w-[4px] h-1"></View>
          <RequestButton
            type={props.relation === "bff" ? true : false}
            width={70}
            height={40}
            onPress={handleAccept}
          ></RequestButton>
        </View>
        {props.relation === "bff" ? (
          <Text className="font-helvetica-light text-10 mt-[6px]">
            Want to be your best friend
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default DetailRequestBox;
