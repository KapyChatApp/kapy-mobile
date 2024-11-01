import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
import UserAvatarLink from "@/components/ui/UserAvatarLink";
import { textLight0Dark500 } from "@/styles/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

const SidebarHeader = ({ isOpen, setIsOpen }: any) => {
  const [avatar, setAvatar] = useState("/assets/avatars/Male.png");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  useFocusEffect(useCallback(() => {
    const getAvatar = async () => {
      const user = await AsyncStorage.getItem("user");
      if (!user) {
        throw new Error("You are unauthenticated!");
      }
      const { firstName, lastName, avatar } = JSON.parse(user);
      setAvatar(avatar);
      setFirstName(firstName);
      setLastName(lastName);
    };
    getAvatar();
  },[]));
  return (
    <View className="header flex flex-row justify-between items-center px-6">
      <View className="user flex flex-row items-center">
        <UserAvatarLink avatarURL={{uri:avatar}} size={57} link="/friends/my-wall"></UserAvatarLink>
        <Text
          className={`font-helvetica-bold text-14 ml-4 ${textLight0Dark500}`}
        >
          {firstName + ' '+ lastName}
        </Text>
      </View>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <Icon size={22} iconURL={IconURL.sidebar}></Icon>
      </TouchableOpacity>
    </View>
  );
};

export default SidebarHeader;
