import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
import UserAvatarLink from "@/components/ui/UserAvatarLink";
import { textLight0Dark500 } from "@/styles/theme";

const SidebarHeader = ({ isOpen, setIsOpen }: any) => {
  return (
    <View className="header flex flex-row justify-between items-center px-6">
      <View className="user flex flex-row items-center">
        <UserAvatarLink size={57} link="/friends/my-wall"></UserAvatarLink>
        <Text className={`font-helvetica-bold text-18 ml-4 ${textLight0Dark500}`}>Name</Text>
      </View>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <Icon size={22} iconURL={IconURL.sidebar}></Icon>
      </TouchableOpacity>
    </View>
  );
};

export default SidebarHeader;
