import { View, Text } from "react-native";
import React from "react";
import CustomButton from "@/components/ui/CustomButton";
import UserAvatar from "@/components/ui/UserAvatar";

const BlockedUserBox = () => {
  return (
    <View className="flex flex-row items-center justify-between border border-border rounded-3xl py-[8px] px-[14px] mx-[19px]">
      <View className="flex flex-row items-center justify-center">
        <UserAvatar size={57}></UserAvatar>
        <Text className="text-14 font-helvetica-bold ml-[12px]">Name</Text>
      </View>
      <CustomButton width={76} height={31} label="Unblock"></CustomButton>
    </View>
  );
};

export default BlockedUserBox;
