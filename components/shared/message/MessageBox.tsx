import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import UserAvatar from "@/components/ui/UserAvatar";
import { bgLight510Dark10, textLight0Dark500 } from "@/styles/theme";
import { useRouter } from "expo-router";
import { MessageBoxProps } from "@/types/message";
import { formatDate, formatDateDistance} from "@/utils/DateFormatter";
import { useMarkReadContext } from "@/context/MarkReadProvider";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
const MessageBox = (props:MessageBoxProps) => {
  const router = useRouter();
  const { unreadMessages } = useMarkReadContext();

  const receiverIds = props.receiverIds ?? []; 
  const receiver = receiverIds[0];  
  const otherReceiver = receiverIds[1];  
  const avatarURL = props.groupAva
  ? props.groupAva
  : receiver && receiver._id === props.localUserId
  ? otherReceiver?.avatar 
  : receiver?.avatar;
const fullName = receiver
  ? receiver._id === props.localUserId
    ? `${otherReceiver?.firstName} ${otherReceiver?.lastName}`
    : `${receiver.firstName} ${receiver.lastName}`
  : "";
  const isReaded = props.readStatus === true ||  unreadMessages[props._id!]===true

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={`flex flex-row px-[20px] py-[10px] items-center w-screen ${bgLight510Dark10}`}
      onPress={()=>{router.push({
        pathname:"/chatbox/[messageId]",
        params:{messageId:props._id? props._id : ""},
      })}}
    >
      <UserAvatar avatarURL={{uri:avatarURL}} size={48}></UserAvatar>
      <View className="flex ml-5 w-screen">
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className={`font-helvetica-bold text-14 ${textLight0Dark500}`}
        >
          {props.groupName===""? fullName:props.groupName}
        </Text>
        <View className="flex flex-row items-center" style={{columnGap:4}}>
        <Text
          numberOfLines={1}
          className={` text-14 overflow-ellipsis ${textLight0Dark500} ${isReaded? "font-helvetica-light" :"font-helvetica-bold"} flex-wrap`}
        >
          {props.responseLastMessage?.createBy === props.localUserId? "You: " + (props.responseLastMessage?.contentId? "Sent a file": props.responseLastMessage?.text) : (props.responseLastMessage?.contentId? "Sent a file" :props.responseLastMessage?.text) }
        </Text>
        {!isReaded? <Icon size={8} iconURL={IconURL.circle}/>:null}
        </View>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="font-helvetica-light text-12 text-deny"
        >
          {formatDateDistance(props.responseLastMessage?.createAt? props.responseLastMessage?.createAt : new Date().toString())}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MessageBox;
