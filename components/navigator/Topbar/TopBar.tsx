import { View, Text, Touchable } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import TabIcon from "../../ui/TabIcon";
import { IconURL } from "@/constants/IconURL";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "../../ui/Icon";
import UserAvatarLink from "@/components/ui/UserAvatarLink";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import MyAvatar from "@/components/ui/MyAvatar";
const TopBar = ({ isOpen, setIsOpen }: any) => {
  const [avatar, setAvatar] = useState("/assets/avatars/Male.png");
  useFocusEffect(useCallback(()=>{
    const getAvatar= async ()=>{
      const user = await AsyncStorage.getItem("user");
      if (!user) {
        throw new Error("You are unauthenticated!");
      }
      const {
        avatar
      } = JSON.parse(user);
      setAvatar(avatar);
    }
    getAvatar();
  },[]));
  return (
    <View
      className={`wrapper flex flex-row items-center justify-between px-[22px] pt-[12px]`}
    >
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <Icon size={22} iconURL={IconURL.sidebar}></Icon>
      </TouchableOpacity>
       <MyAvatar size={47}/>
    </View>
  );
};

export default TopBar;
