import { View, Text, Platform } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import Previous from "@/components/ui/Previous";
import { bgLight500Dark0, bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import UserAvatar from "@/components/ui/UserAvatar";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IconURL } from "@/constants/IconURL";
import Icon from "@/components/ui/Icon";

const ChatBoxHeader = () => {
  const navigation = useNavigation();
  return (
    <View
      className={`${bgLight500Dark10} w-full h-[82px] flex flex-row items-center justify-between px-[17px]`}
    >
      <View className="flex flex-row items-center">
        <Previous navigation={navigation} isAbsolute={false}></Previous>
        <View className="flex flex-row items-center" style={{columnGap:9}}>
          <UserAvatar size={54} />
          {Platform.OS==='ios'? (<View className="flex h-fit"  style={{rowGap:4}}>
            <Text className={`font-helvetica-bold ${textLight0Dark500} text-18 `} >Name</Text>
            <Text className="font-helvetica-light text-12 text-cardinal">Online</Text>
          </View>):(<View className="flex h-fit">
            <Text className={`font-helvetica-bold ${textLight0Dark500} text-18 top-1`} >Name</Text>
            <Text className="font-helvetica-light text-12 text-cardinal botton-1">Online</Text>
          </View>)}
          
        </View>
      </View>
      <View
        className="flex flex-row items-center justify-center"
        style={{ columnGap: 12 }}
      >
        <TouchableOpacity>
          <Icon iconURL={IconURL.call} size={40}></Icon>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon iconURL={IconURL.video_call} size={40}></Icon>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon iconURL={IconURL.information} size={32}></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatBoxHeader;
