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
import { ChatBoxHeaderProps } from "@/types/message";

const ChatBoxHeader = (props:ChatBoxHeaderProps) => {
  const navigation = useNavigation();
  const router = useRouter();
  return (
    <View
      className={`bg-light-500 dark:bg-dark-0 w-full h-[82px] flex flex-row items-center justify-between px-[8px]`}
    >
      <View className="flex flex-row items-center">
        <Previous navigation={navigation} isAbsolute={false}></Previous>
        <View className="flex flex-row items-center" style={{ columnGap: 9 }}>
          <UserAvatar   avatarURL={{uri:props.avatar}} size={54} />
          {Platform.OS === "ios" ? (
            <View className="flex h-fit" style={{ rowGap: 4 }}>
              <Text
                className={`font-helvetica-bold ${textLight0Dark500} text-14 `}
              >
                {props.name}
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
                {props.name}
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
          onPress={() =>
            router.push({
              pathname: "/chatbox/chatbox-detail/[chatboxDetailId]",
              params: {
                chatboxDetailId: 1,
              },
            })
          }
        >
          <Icon iconURL={IconURL.information} size={20}></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatBoxHeader;
