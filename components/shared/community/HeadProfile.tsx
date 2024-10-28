import { View, Text, Image } from "react-native";
import React from "react";
import Previous from "@/components/ui/Previous";
import { useNavigation } from "expo-router";
import UserAvatar from "@/components/ui/UserAvatar";
import { textLight0Dark500 } from "@/styles/theme";
import { HeadProfileProps } from "@/types/user";

const HeadProfile = (props:HeadProfileProps) => {
  return (
    <View className="flex items-center justify-center relative">
      <View className="w-screen h-[200px] bg-deny "></View>
      <View className=" flex items-center justify-center absolute top-[90px]">
        <UserAvatar size={176}></UserAvatar>
        <Text className="text-24 font-helvetica-bold text-cardinal mt-[4px]">{props.firstName + ' '+ props.lastName}</Text>
        <Text className={`text-14 font-helvetica-light my-[2px] ${textLight0Dark500}`}>({props.nickName})</Text>
        
        <View className="flex flex-row items-center justify-center">
          <Text className={`text-14 font-helvetica-light ${textLight0Dark500}`}>Community Point: </Text>
          <Text className="text-18 font-helvetica-bold text-cardinal">100</Text>
        </View>
        <Text className={`text-16 font-helvetica-light my-[8px] ${textLight0Dark500}`}>{props.bio}</Text>

      </View>
    </View>
  );
};

export default HeadProfile;
