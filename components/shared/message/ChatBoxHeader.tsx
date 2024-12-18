import { View, Text, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import Previous from "@/components/ui/Previous";
import {
  bgLight500Dark0,
  bgLight500Dark10,
  bgLight500Dark50,
  textLight0Dark500,
} from "@/styles/theme";
import UserAvatar from "@/components/ui/UserAvatar";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IconURL } from "@/constants/IconURL";
import Icon from "@/components/ui/Icon";
import { ChatBoxHeaderProps, MessageBoxProps } from "@/types/message";
import UserAvatarLink from "@/components/ui/UserAvatarLink";
import { pusherClient } from "@/lib/pusher";

const ChatBoxHeader = (props: MessageBoxProps) => {
  const navigation = useNavigation();
  const router = useRouter();
  const [avatarURL, setAvatarURL] = useState("");
  const [fullName, setFullName] = useState("");
  const [userId, setUserId] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  useEffect(() => {
    if (props.receiverIds?.[0] && props.receiverIds?.[1]) {
      const receiverIds = props.receiverIds ?? [];
      const receiver = receiverIds[0];
      const otherReceiver = receiverIds[1];
      const avatarURL = props.groupAva
        ? props.groupAva
        : receiver && receiver._id === props.localUserId
        ? otherReceiver?.avatar
        : receiver?.avatar;
      setAvatarURL(avatarURL);
      const fullName = props.groupName
        ? props.groupName
        : receiver?._id === props.localUserId
        ? `${otherReceiver?.firstName} ${otherReceiver?.lastName}`
        : `${receiver?.firstName} ${receiver?.lastName}`;
      setFullName(fullName);
      const id =
        receiver?._id === props.localUserId ? otherReceiver?._id : receiver._id;
      setUserId(id);
      pusherClient.subscribe(`private-${id}`);
    pusherClient.bind("online-status", (data:any)=>{
      console.log("change statusssssssssss");
      setIsOnline(data.online);
    });
    pusherClient.bind("offline-status", (data:any)=>{
      console.log("change statusssssssssss");
      setIsOnline(data.online);
    });
    }
    
  }, [props]);
  return (
    <View
      className={`bg-light-500 dark:bg-dark-0 w-full h-[82px] flex flex-row items-center justify-between  px-[16px]`}
    >
      <View className="flex flex-row items-center" style={{columnGap:12}}>
        <Previous navigation={navigation} isAbsolute={false}></Previous>
        <View className="flex flex-row items-center" style={{ columnGap:8 }}>
          {props.groupName ? (
            <UserAvatar size={46} avatarURL={{ uri: avatarURL }} />
          ) : (
            <UserAvatarLink
              avatarURL={{
                uri: avatarURL,
              }}
              size={46}
              userId={userId}
            />
          )}

          {Platform.OS === "ios" ? (
            <View className="flex h-fit" style={{ rowGap: 4 }}>
              <Text
                className={`font-helvetica-bold ${textLight0Dark500} text-14 `}
              >
                {fullName}
              </Text>
              <Text className="font-helvetica-light text-10 text-cardinal">
                {isOnline ? "Online" : "Offline"}
              </Text>
            </View>
          ) : (
            <View className="flex h-fit">
              <Text
                className={`font-helvetica-bold ${textLight0Dark500} text-14 top-1`}
              >
                {fullName}
              </Text>
              <Text className="font-helvetica-light text-10 text-cardinal botton-1">
                {isOnline ? "Online" : "Offline"}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View
        className="flex flex-row items-center justify-center"
        style={{ columnGap: 10 }}
      >
        <TouchableOpacity>
          <Icon iconURL={IconURL.call} size={30}></Icon>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon iconURL={IconURL.video_call} size={30}></Icon>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (props._id) {
              router.push({
                pathname: "/chatbox/chatbox-detail/[chatboxDetailId]",
                params: {
                  chatboxDetailId: props._id,
                },
              });
            } else {
              console.error("chatboxDetailId is undefined");
            }
          }}
        >
          <Icon iconURL={IconURL.information} size={24}></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatBoxHeader;
