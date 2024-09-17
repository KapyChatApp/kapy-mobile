import { View, Text, Touchable } from "react-native";
import React from "react";
import TabIcon from "../ui/TabIcon";
import { IconURL } from "@/constants/IconURL";
import UserAvatar from "../ui/UserAvatar";
import { TouchableOpacity } from "react-native-gesture-handler";

const TopBar = ({ isOpen, setIsOpen }: any) => {
  return (
    <View className="wrapper flex flex-row items-center justify-between mx-[22px]">
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <TabIcon iconURL={IconURL.sidebar}></TabIcon>
      </TouchableOpacity>
      <UserAvatar size={47}></UserAvatar>
    </View>
  );
};

export default TopBar;
