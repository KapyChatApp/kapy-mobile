import { View, Text, Touchable } from "react-native";
import React, { useEffect, useState } from "react";
import TabIcon from "../../ui/TabIcon";
import { IconURL } from "@/constants/IconURL";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "../../ui/Icon";
import UserAvatarLink from "@/components/ui/UserAvatarLink";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "@/components/ui/CustomButton";
import { useRouter } from "expo-router";
const FriendTopBar = ({ isOpen, setIsOpen }: any) => {
  const [avatar, setAvatar] = useState("/assets/avatars/Male.png");
  const router = useRouter();
  return (
    <View
      className={`wrapper flex flex-row items-center justify-between px-[22px] pt-[12px]`}
    >
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <Icon size={22} iconURL={IconURL.sidebar}></Icon>
      </TouchableOpacity>
      <View className="p-[6px]">
        <CustomButton label="New Friend" width={120} height={35} onPress={()=>router.push({pathname:"/(tabs)/friends/new-friend"})}/>
      </View>
    </View>
  );
};

export default FriendTopBar;
