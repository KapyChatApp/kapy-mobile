import { View, Text, Platform } from "react-native";
import React from "react";
import { textLight0Dark500 } from "@/styles/theme";
import { UserBioProps } from "@/types/user";
import { formatDate } from "@/utils/DateFormatter";

const UserBio = (props:UserBioProps) => {
  return (
    <View className={`border border-border p-[20px] rounded-3xl ${Platform.OS==='ios'? "top-[200px] ":"top-[220px]"} flex justify-center gap-y-[12px] mx-[20px]`}>
      <View className="flex flex-row w-full justify-start gap-x-[8px]">
        <View className="flex gap-y-[4px]">
          <Text className={`font-helvetica-light text-14 ${textLight0Dark500}`}>
            Gender: {props.gender}
          </Text>
          <Text className={`font-helvetica-light text-14 ${textLight0Dark500}`}>
            Birthday: {props.birthDay ? formatDate(props.birthDay) : "N/A"}
          </Text>
          <Text className={`font-helvetica-light text-14 ${textLight0Dark500}`}>
            AttendDay: {props.attendDate ? formatDate(props.attendDate) : "N/A"}
          </Text>
        </View>
        <View className="flex gap-y-[4px]">
          <Text className={`font-helvetica-light text-14 ${textLight0Dark500}`}>
            PhoneNumber: {props.phoneNumber}
          </Text>
          <Text className={`font-helvetica-light text-14 ${textLight0Dark500}`}>
            Email: {props.email}
          </Text>
          <Text className={`font-helvetica-light text-14 ${textLight0Dark500}`}>
            Relationship: {props.relationShip}
          </Text>
        </View>
      </View>
      <View className="w-full flex gap-y-[4px]">
        <Text className={`font-helvetica-light text-14 ${textLight0Dark500}`}>
          Address: {props.address}
        </Text>
        <Text className={`font-helvetica-light text-14 ${textLight0Dark500}`}>
          Jobs: {props.job}
        </Text>
        <Text className={`font-helvetica-light text-14 ${textLight0Dark500}`}>
          Hobbies: {props.hobbies}
        </Text>
      </View>
    </View>
  );
};

export default UserBio;
