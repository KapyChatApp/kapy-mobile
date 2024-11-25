import { View, Text } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import UserAvatar from "@/components/ui/UserAvatar";
import { bgLight510Dark10, textLight0Dark500 } from "@/styles/theme";
import { useRouter } from "expo-router";
import { MessageBoxProps } from "@/types/message";
import { formatDate, formatDateDistance} from "@/utils/DateFormatter";
const MessageBox = (props:MessageBoxProps) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={`flex flex-row px-[20px] py-[10px] items-center w-screen ${bgLight510Dark10}`}
      onPress={()=>{router.push({
        pathname:"/chatbox/[messageId]",
        params:{messageId:props._id},
      })}}
    >
      <UserAvatar avatarURL={{uri:props.groupAva? props.groupAva :( props.receiverIds[0]._id === props.localUserId? props.receiverIds[1].avatar: props.receiverIds[0] )}} size={48}></UserAvatar>
      <View className="flex ml-5 w-screen">
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className={`font-helvetica-bold text-14 ${textLight0Dark500}`}
        >
          {props.groupName? props.groupName : props.receiverIds[1].firstName + props.receiverIds[1].lastName}
        </Text>
        <Text
          numberOfLines={1}
          className={`font-helvetica-light text-14 overflow-ellipsis ${textLight0Dark500}`}
        >
          {props.lastMessage.createBy === props.localUserId? "You: " + (props.lastMessage.contentId.length!=0? "Sent a file": props.lastMessage.text) : (props.lastMessage.contentId.length!=0? "Sent a file" :props.lastMessage.text) }
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="font-helvetica-light text-12 text-deny"
        >
          {formatDateDistance(props.lastMessage.createAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MessageBox;
