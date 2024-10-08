import { View, Text } from "react-native";
import React from "react";

const UserBio = () => {
  return (
    <View className="border border-border p-[20px] rounded-3xl top-[230px] flex justify-center gap-y-[12px]">
      <View className="flex flex-row w-full justify-start gap-x-[8px]">
        <View className="flex gap-y-[4px]">
          <Text className="font-helvetica-light text-14">Gender: Male</Text>
          <Text className="font-helvetica-light text-14">
            Birthday: 11/4/1999
          </Text>
          <Text className="font-helvetica-light text-14">
            AttendDay: 10/12/2024
          </Text>
        </View>
        <View className="flex gap-y-[4px]">
          <Text className="font-helvetica-light text-14">
            PhoneNumber: 098945789
          </Text>
          <Text className="font-helvetica-light text-14">
            Email: 111111@gmail.com
          </Text>
          <Text className="font-helvetica-light text-14">
            Relationship: Single
          </Text>
        </View>
      </View>
      <View className="w-full flex gap-y-[4px]">
        <Text className="font-helvetica-light text-14">Address: Tan Binh</Text>
        <Text className="font-helvetica-light text-14">
          Jobs: Content Creator at Kapy Studio
        </Text>
        <Text className="font-helvetica-light text-14">
          Hobbies: Soccer, TV, IT, Engineering
        </Text>
      </View>
    </View>
  );
};

export default UserBio;
