import { View, Text, Platform } from "react-native";
import React from "react";
import { textLight0Dark500 } from "@/styles/theme";
import { UserBioProps } from "@/types/user";
import { formatDate } from "@/utils/DateFormatter";
import ProfileField from "@/components/ui/ProfileField";
import { IconURL } from "@/constants/IconURL";

const UserBio = (props: UserBioProps) => {
  return (
    <View
      className={`${
        Platform.OS === "ios" ? "top-[200px] " : "top-[220px]"
      } flex-1 px-[12px]`}
    >
      <View className="flex">
        <Text
          className={`${textLight0Dark500} text-14 font-helvetica-bold mb-[13px]`}
        >
          General
        </Text>
        <ProfileField label="Gender" value={props.gender ? "Male" : "Female"} />
        <ProfileField
          label="Birthday"
          value={formatDate(props.birthDay ? props.birthDay : "")}
        />
        <ProfileField
          label="AttendDay"
          value={formatDate(props.attendDate ? props.attendDate : "")}
        />
        <ProfileField
          label="Relationship"
          value={props.relationShip}
          iconURL={IconURL.relationship}
        />
        <ProfileField />
      </View>
      <View className="flex">
        <Text
          className={`${textLight0Dark500} text-14 font-helvetica-bold mb-[13px]`}
        >
          Contact
        </Text>
        <ProfileField label="Phonenumber" value={props.phoneNumber} />
        <ProfileField label="Email" value={props.email} />
        <ProfileField label="Address" value={props.address} />
        <ProfileField />
      </View>
      <View className="flex">
        <Text
          className={`${textLight0Dark500} text-14 font-helvetica-bold mb-[13px]`}
        >
          Personal
        </Text>
        <ProfileField label="Jobs" value={props.job} />
        <ProfileField label="Hobbies" value={props.hobbies} />
        <ProfileField />
      </View>
    </View>
  );
};

export default UserBio;
