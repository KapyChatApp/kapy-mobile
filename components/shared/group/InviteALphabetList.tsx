import { View, Text } from "react-native";
import React from "react";
import { textLight0Dark500 } from "@/styles/theme";
import InviteBox from "./InviteBox";

const InviteALphabetList = ({ letter }: any) => {
  return (
    <View className="flex px-[20px]" style={{ gap: 4 }}>
      <Text className={`${textLight0Dark500}`}>{letter}</Text>
        <InviteBox isInvited={false}/>
        <InviteBox isInvited={true}/>
        <InviteBox/>
        <InviteBox/>
        <InviteBox/>
    </View>
  );
};

export default InviteALphabetList;
