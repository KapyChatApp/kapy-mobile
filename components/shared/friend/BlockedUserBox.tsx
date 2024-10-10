import { View, Text } from "react-native";
import React from "react";
import CustomButton from "@/components/ui/CustomButton";
import UserAvatar from "@/components/ui/UserAvatar";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";

const BlockedUserBox = () => {
  return (
    <View className={`flex flex-row items-center justify-between border border-border rounded-3xl py-[8px] px-[14px] mx-[19px] ${bgLight500Dark10}`}>
      <View className="flex flex-row items-center justify-center">
        <UserAvatar size={57}></UserAvatar>
        <Text className={`text-14 font-helvetica-bold ml-[12px] ${textLight0Dark500}`}>Name</Text>
      </View>
      <CustomButton width={76} height={31} label="Unblock"></CustomButton>
    </View>
  );
};

export default BlockedUserBox;
