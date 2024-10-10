import { View, Text } from "react-native";
import React from "react";
import CustomButton from "@/components/ui/CustomButton";
import UserAvatar from "@/components/ui/UserAvatar";
import { bgLight510Dark20, textLight0Dark500 } from "@/styles/theme";

const BestFriendBox = () => {
  return (
    <View
      className={`flex flex-row items-center justify-between border border-border rounded-3xl py-[8px] px-[14px] mx-[19px] ${bgLight510Dark20}`}
    >
      <View className="flex flex-row items-center justify-center">
        <UserAvatar size={57}></UserAvatar>
        <View className="ml-[12px] flex justify-between">
          <Text className={`text-14 font-helvetica-bold ${textLight0Dark500}`}>Name</Text>
          <Text className={`text-12 font-helvetica-light ${textLight0Dark500}`}>2 mutual friends</Text>
          <Text className="text-10 font-helvetica-light text-cardinal">
            Be Bestfriend at 00:00
          </Text>
        </View>
      </View>
      <CustomButton
        type={true}
        width={76}
        height={31}
        label="unBFriend"
      ></CustomButton>
    </View>
  );
};

export default BestFriendBox;
