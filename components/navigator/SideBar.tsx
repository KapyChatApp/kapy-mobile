import { View, Text } from "react-native";
import React, { useState } from "react";
import UserAvatar from "../ui/UserAvatar";
import { TouchableOpacity } from "react-native-gesture-handler";
import TabIcon from "../ui/TabIcon";
import { IconURL } from "@/constants/IconURL";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated from "react-native-reanimated";

const SideBar = ({ isOpen, setIsOpen }: any) => {
  return isOpen ? (
    <SafeAreaView className="h-screen absolute w-2/3 flex z-50 bg-white">
      <Animated.View className="header flex flex-row justify-between items-center px-6">
        <View className="user flex flex-row items-center">
          <UserAvatar size={57}></UserAvatar>
          <Text className="font-helvetica-bold text-18 ml-4 ">Name</Text>
        </View>
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
          <TabIcon iconURL={IconURL.sidebar}></TabIcon>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  ) : null;
};

export default SideBar;
