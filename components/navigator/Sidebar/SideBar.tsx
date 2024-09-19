import { View, Text } from "react-native";
import React, { useState } from "react";
import UserAvatar from "../../ui/UserAvatar";
import { TouchableOpacity } from "react-native-gesture-handler";
import TabIcon from "../../ui/TabIcon";
import { IconURL } from "@/constants/IconURL";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated from "react-native-reanimated";
import Icon from "../../ui/Icon";
import SidebarItems from "./SidebarItems";
import SidebarLinkList from "./SidebarLinkList";
import SidebarRecents from "./SidebarRecents";
import SidebarHeader from "./SidebarHeader";

const SideBar = ({ isOpen, setIsOpen }: any) => {
  return isOpen ? (
    <SafeAreaView className="h-screen absolute w-2/3 flex z-50 bg-white">
      <SidebarHeader isOpen={isOpen} setIsOpen={setIsOpen}></SidebarHeader>
      <SidebarLinkList />
      <SidebarRecents />
    </SafeAreaView>
  ) : null;
};

export default SideBar;
