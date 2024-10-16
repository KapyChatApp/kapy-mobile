import { View, Text } from "react-native";
import React from "react";
import { textLight0Dark500 } from "@/styles/theme";
import FriendBox from "../friend/FriendBox";
import GroupBox from "./GroupBox";

const GroupAlphabetList = ({letter}:any) => {
  return (
    <View className="flex px-[20px]" style={{ gap: 4 }}>
      <Text className={`${textLight0Dark500}`}>{letter}</Text>
      <GroupBox/>
      <GroupBox/>
      <GroupBox/>
      <GroupBox/>
      <GroupBox/>
    </View>
  );
};

export default GroupAlphabetList;
