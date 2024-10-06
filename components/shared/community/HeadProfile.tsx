import { View, Text, Image } from "react-native";
import React from "react";
import Previous from "@/components/ui/Previous";
import { useNavigation } from "expo-router";
import UserAvatar from "@/components/ui/UserAvatar";

const HeadProfile = () => {
  return (
    <View className="flex items-center justify-center relative">
      <View className="w-[430px] h-[200px] bg-deny "></View>
      <View className=" flex items-center justify-center absolute top-[90px]">
        <UserAvatar size={176}></UserAvatar>
        <Text className="text-24 font-helvetica-bold text-cardinal mt-[4px]">Name</Text>
        <Text className="text-18 font-helvetica-light my-[2px]">(Nickname)</Text>
        <Text className="text-16 font-helvetica-light my-[2px]">Description</Text>
        <View className="flex flex-row items-center justify-center">
          <Text className="text-14 font-helvetica-light">Community Point: </Text>
          <Text className="text-18 font-helvetica-bold color-cardinal">100</Text>
        </View>
      </View>
    </View>
  );
};

export default HeadProfile;
