import { View, Text, Image } from "react-native";
import React from "react";
import Previous from "@/components/ui/Previous";
import { useNavigation } from "expo-router";
import UserAvatar from "@/components/ui/UserAvatar";

const MyHeadProfile = () => {
  return (
    <View className="flex items-center justify-center relative">
      <View className="w-[430px] h-[200px] bg-deny absolute top-0"></View>
      <View className=" flex items-center justify-center top-[90px]">
        <UserAvatar size={176}></UserAvatar>
        <Text className="text-24 font-helvetica-bold text-cardinal mt-[4px]">Name</Text>
        <Text className="text-18 font-helvetica-light my-[2px]">(Nickname)</Text>
        <Text className="text-16 font-helvetica-light my-[2px]">Description</Text>
        <View className="flex flex-row items-center justify-center">
          <Text className="text-14 font-helvetica-light">Community Point: </Text>
          <Text className="text-18 font-helvetica-bold color-cardinal">100</Text>
        </View>
      </View>
      <View className="border border-border p-[20px] flex gap-y-[20px] rounded-3xl">
      <View>
        <View>
          <Text className="font-helvetica-light text-14">Gender: Male</Text>
          <Text className="font-helvetica-light text-14">Birthday: 11/4/1999</Text>
          <Text className="font-helvetica-light text-14">AttendDay: 10/12/2024</Text>
        </View>
        <View>
          <Text className="font-helvetica-light text-14"> PhoneNumber: 098945789</Text>
          <Text className="font-helvetica-light text-14">Email: 111111@gmail.com</Text>
          <Text className="font-helvetica-light text-14">Address: Tan Binh</Text>
        </View>
      </View>
      <View>
        <Text className="font-helvetica-light text-14">Jobs: Content Creator at Kapy Studio</Text>
        <Text className="font-helvetica-light text-14">Hobbies: Soccer, TV, IT, Engineering</Text>
        <Text className="font-helvetica-light text-14">Relationship: Single</Text>
      </View>
    </View>
    </View>
  );
};

export default MyHeadProfile;
