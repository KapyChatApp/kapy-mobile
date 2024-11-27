import { View, Text, Platform } from "react-native";
import React from "react";
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

const ChatBoxHeader = (props:MessageBoxProps) => {
  const navigation = useNavigation();
  const router = useRouter();
  const receiverIds = props.receiverIds ?? []; 
  const receiver = receiverIds[0];  
  const otherReceiver = receiverIds[1];  
  const avatarURL = props.groupAva
  ? props.groupAva
  : receiver && receiver._id === props.localUserId
  ? receiver?.avatar // Nếu receiver._id === localUserId, lấy avatar của otherReceiver
  : otherReceiver?.avatar;  // Nếu không, lấy avatar của receiver

const fullName = receiver
  ? receiver._id === props.localUserId
    ? `${receiver?.firstName} ${receiver?.lastName}` // Tên của otherReceiver nếu receiver._id === localUserId
    : `${otherReceiver.firstName} ${otherReceiver.lastName}`
  : "";
  return (
    <View
      className={`bg-light-500 dark:bg-dark-0 w-full h-[82px] flex flex-row items-center justify-between px-[8px]`}
    >
      <View className="flex flex-row items-center">
        <Previous navigation={navigation} isAbsolute={false}></Previous>
        <View className="flex flex-row items-center" style={{ columnGap: 9 }}>
          <UserAvatar   avatarURL={{
          uri:avatarURL
        }} size={54} />
          {Platform.OS === "ios" ? (
            <View className="flex h-fit" style={{ rowGap: 4 }}>
              <Text
                className={`font-helvetica-bold ${textLight0Dark500} text-14 `}
              >
                 {fullName}
              </Text>
              <Text className="font-helvetica-light text-10 text-cardinal">
                Online
              </Text>
            </View>
          ) : (
            <View className="flex h-fit">
              <Text
                className={`font-helvetica-bold ${textLight0Dark500} text-14 top-1`}
              >
                 {props.groupName
          ? props.groupName
          : receiver
          ? receiver._id === props.localUserId
            ? otherReceiver?.firstName + " " + otherReceiver?.lastName 
            : receiver.firstName + " " + receiver.lastName
          : ""}
              </Text>
              <Text className="font-helvetica-light text-10 text-cardinal botton-1">
                Online
              </Text>
            </View>
          )}
        </View>
      </View>
      <View
        className="flex flex-row items-center justify-center"
        style={{ columnGap: 7 }}
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
          <Icon iconURL={IconURL.information} size={20}></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatBoxHeader;
