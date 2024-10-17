import { View, Text, Platform } from "react-native";
import React from "react";
import { textLight0Dark500 } from "@/styles/theme";

const UserBio = () => {
  return (
    <View className={`border border-border p-[20px] rounded-3xl ${Platform.OS==='ios'? "top-[200px] ":"top-[220px]"} flex justify-center gap-y-[12px] mx-[20px]`}>
      <View className="flex flex-row w-full justify-start gap-x-[8px]">
        <View className="flex gap-y-[4px]">
          <Text className={`font-helvetica-light text-14 ${textLight0Dark500}`}>
            Gender: Male
          </Text>
          <Text className={`font-helvetica-light text-14 ${textLight0Dark500}`}>
            Birthday: 11/4/1999
          </Text>
          <Text className={`font-helvetica-light text-14 ${textLight0Dark500}`}>
            AttendDay: 10/12/2024
          </Text>
        </View>
        <View className="flex gap-y-[4px]">
          <Text className={`font-helvetica-light text-14 ${textLight0Dark500}`}>
            PhoneNumber: 098945789
          </Text>
          <Text className={`font-helvetica-light text-14 ${textLight0Dark500}`}>
            Email: 111111@gmail.com
          </Text>
          <Text className={`font-helvetica-light text-14 ${textLight0Dark500}`}>
            Relationship: Single
          </Text>
        </View>
      </View>
      <View className="w-full flex gap-y-[4px]">
        <Text className={`font-helvetica-light text-14 ${textLight0Dark500}`}>
          Address: Tan Binh
        </Text>
        <Text className={`font-helvetica-light text-14 ${textLight0Dark500}`}>
          Jobs: Content Creator at Kapy Studio
        </Text>
        <Text className={`font-helvetica-light text-14 ${textLight0Dark500}`}>
          Hobbies: Soccer, TV, IT, Engineering
        </Text>
      </View>
    </View>
  );
};

export default UserBio;
