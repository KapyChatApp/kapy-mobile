import { View, Text } from "react-native";
import React from "react";
import FriendBox from "./FriendFindBox";
import { SafeAreaView } from "react-native-safe-area-context";
import { textLight0Dark500 } from "@/styles/theme";

const FriendAlphabetList = ({ letter }: any) => {
  return (
    <View className="flex px-[20px] " style={{ gap: 4 }}>
      <Text className={`${textLight0Dark500}`}>{letter}</Text>
    </View>
  );
};

export default FriendAlphabetList;
