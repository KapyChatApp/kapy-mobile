import { View, Text } from "react-native";
import React from "react";
import UserAvatar from "@/components/ui/UserAvatar";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";

const SidebarHeader = ({ isOpen, setIsOpen }: any) => {
  return (
    <View className="header flex flex-row justify-between items-center px-6">
      <View className="user flex flex-row items-center">
        <UserAvatar size={57}></UserAvatar>
        <Text className="font-helvetica-bold text-18 ml-4 ">Name</Text>
      </View>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <Icon size={22} iconURL={IconURL.sidebar}></Icon>
      </TouchableOpacity>
    </View>
  );
};

export default SidebarHeader;
