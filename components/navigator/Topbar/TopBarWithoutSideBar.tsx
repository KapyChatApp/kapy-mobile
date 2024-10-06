import { View, Text } from "react-native";
import React from "react";
import UserAvatarLink from "@/components/ui/UserAvatarLink";
const TopBarWithoutSideBar = () => {
  return (
    <View className="wrapper flex flex-row items-center justify-end mx-[22px]">
      <UserAvatarLink size={47}></UserAvatarLink>
    </View>
  );
};

export default TopBarWithoutSideBar;
