import { View, Text, Modal, Dimensions, Platform, GestureResponderEvent } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, TouchableOpacity } from "react-native-gesture-handler";
import UserAvatar from "@/components/ui/UserAvatar";
import { bgLight500Dark10, bgLight510Dark10, textLight0Dark500 } from "@/styles/theme";
import { useRouter } from "expo-router";
import { MessageBoxProps } from "@/types/message";
import { formatDate, formatDateDistance} from "@/utils/DateFormatter";
import { useMarkReadContext } from "@/context/MarkReadProvider";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
import * as Haptics from "expo-haptics";
import { useClickOutside } from "react-native-click-outside";
import { useMessageBox } from "@/context/MessageBoxContext";
import { extractContentFromGroupSystemMessage, isGroupSystemMessage } from "@/utils/Text";
const MessageBox = (props:MessageBoxProps) => {
  const router = useRouter();
  const { checkInMessageBox} = useMessageBox();

  const { unreadMessages } = useMarkReadContext();

  const receiverIds = props.receiverIds ?? []; 
  const receiver = receiverIds[0];  
  const otherReceiver = receiverIds[1];  
  const avatarURL = props.groupName!==""
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
    <View className="flex-1" >
    
    <TouchableOpacity
    activeOpacity={0.7}
      className={`flex flex-row px-[20px] py-[10px] items-center w-screen ${bgLight510Dark10}`}
        onPress={() => {
          checkInMessageBox(props._id!); router.push({
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
          <View className="flex flex-row items-center" style={{ columnGap: 4 }}>
            
            {props.responseLastMessage ?
              <Text
                numberOfLines={1}
                className={` text-14 overflow-ellipsis ${textLight0Dark500} ${isReaded ? "font-helvetica-light" : "font-helvetica-bold"} flex-wrap`}
              >
                {props.responseLastMessage?.createBy === props.localUserId ? "You: " + (props.responseLastMessage?.contentId ? "Sent a file" : (isGroupSystemMessage(props.responseLastMessage?.text) ? extractContentFromGroupSystemMessage(props.responseLastMessage?.text):props.responseLastMessage?.text)) : (props.responseLastMessage?.contentId ? "Sent a file" : (isGroupSystemMessage(props.responseLastMessage?.text) ? extractContentFromGroupSystemMessage(props.responseLastMessage?.text):props.responseLastMessage?.text))}
              </Text> : null}
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
    </View>
  );
};

export default MessageBox;
