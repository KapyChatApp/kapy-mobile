import { View, Text } from "react-native";
import React from "react";
import UserAvatar from "../../ui/UserAvatar";

const TopBarWithoutSideBar = () => {
  return (
    <View className="wrapper flex flex-row items-center justify-end mx-[22px]">
      <UserAvatar size={47}></UserAvatar>
    </View>
  );
};

export default TopBarWithoutSideBar;
