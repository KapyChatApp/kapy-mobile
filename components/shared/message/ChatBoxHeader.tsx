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
import { getRealtimeOfUser } from "@/lib/realtime";
import { formatDateDistance } from "@/utils/DateFormatter";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatBoxHeader = (props: MessageBoxProps) => {
  const navigation = useNavigation();
  const router = useRouter();
  const [avatarURL, setAvatarURL] = useState("");
  const [fullName, setFullName] = useState("");
  const [userId, setUserId] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [updateTime, setUpdateTime] = useState("");
  const [groupAva, setGroupAva] = useState("");
  const [groupName, setGroupName] = useState("");
  console.log(updateTime);
  useEffect(() => {
    const getHeaderData = async () => {
      if(props.groupName===""){
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
          receiver?._id === props.localUserId
            ? otherReceiver?._id
            : receiver._id;
        setUserId(id);
        const realtime = await getRealtimeOfUser(id);
        console.log(realtime);
        setUpdateTime(realtime.updateTime);
        console.log("updateTime: ",realtime.updateTime);
        setIsOnline(realtime.isOnline);
        pusherClient.subscribe(`private-${id}`);
        pusherClient.bind("online-status", (data: any) => {
          setIsOnline(data.online);
          setUpdateTime(data.updateTime);
        });
        pusherClient.bind("offline-status", (data: any) => {
          setIsOnline(data.online);
          setUpdateTime(data.updateTime);
        });
      }
    }else{
       const box = await AsyncStorage.getItem(`box-${props._id}`);
       const boxData = await JSON.parse(box!);
       setGroupAva(boxData.groupAva);
       setGroupName(boxData.groupName);
    }
    };
    getHeaderData();
  }, [props]);
  return (
    <View
      className={`bg-light-500 dark:bg-dark-0 w-full h-[82px] flex flex-row items-center justify-between  px-[16px]`}
    >
      <View className="flex flex-row items-center" style={{ columnGap: 12 }}>
        <Previous navigation={navigation} isAbsolute={false}></Previous>
        <View className="flex flex-row items-center" style={{ columnGap: 8 }}>
          {props.groupName ? (
            <UserAvatar size={46} avatarURL={{ uri: groupName===""? avatarURL:groupAva }} />
          ) : (
            <UserAvatarLink
              avatarURL={{
                uri:groupName===""? avatarURL:groupAva,
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
                {groupName===""? fullName:groupName}
              </Text>
              {props.groupName===""?
              (isOnline? <View className="flex flex-row items-center" style={{columnGap:4}}><Text className="text-12 font-helvetica-bold text-cardinal">Online</Text> <View className="w-[8px] h-[8px] bg-cardinal rounded-full"/></View>:<Text className="text-12 text-cardinal font-helvetica-normal">Online {updateTime!=""? formatDateDistance(updateTime):null}</Text>):null}
          
            </View>
          ) : (
            <View className="flex h-fit">
              <Text
                className={`font-helvetica-bold ${textLight0Dark500} text-14 top-1`}
              >
                {fullName}
              </Text>
              {isOnline? <View className="flex flex-row items-center" style={{columnGap:4}}><Text className="text-12 font-helvetica-bold text-cardinal">Online</Text> <View className="w-[8px] h-[8px] bg-cardinal rounded-full"/></View>:<Text className="text-12 text-cardinal font-helvetica-normal">Online {updateTime!=""? formatDateDistance(updateTime):null}</Text>}
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
