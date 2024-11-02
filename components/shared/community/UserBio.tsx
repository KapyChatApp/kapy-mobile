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
      {props.gender||props.birthDay||props.attendDate||props.relationShip? ( <View className="flex">
        <Text
          className={`${textLight0Dark500} text-14 font-helvetica-bold mb-[13px]`}
        >
          General
        </Text>
        {props.gender? (<ProfileField label="Gender" value={props.gender ? "Male" : "Female"} />):null}
        {props.birthDay? ( <ProfileField
          label="Birthday"
          value={formatDate(props.birthDay ? props.birthDay : "")}
        />):null}
        {props.attendDate? ( <ProfileField
          label="AttendDay"
          value={formatDate(props.attendDate ? props.attendDate : "")}
        />):null}
        {props.relationShip? (      <ProfileField
          label="Relationship"
          value={props.relationShip}
          iconURL={IconURL.relationship}
        />):null}
        <ProfileField />
      </View>):null}

      {props.phoneNumber||props.email||props.address? ( <View className="flex">
        <Text
          className={`${textLight0Dark500} text-14 font-helvetica-bold mb-[13px]`}
        >
          Contact
        </Text>
        {props.phoneNumber? ( <ProfileField label="Phonenumber" value={props.phoneNumber} />):null }
        {props.email? (<ProfileField label="Email" value={props.email} />):null}
        {props.address? (<ProfileField label="Address" value={props.address} />):null}
        <ProfileField />
      </View>):null}
     
     {props.job||props.hobbies? ( <View className="flex">
        <Text
          className={`${textLight0Dark500} text-14 font-helvetica-bold mb-[13px]`}
        >
          Personal
        </Text>
        {props.job? (<ProfileField label="Jobs" value={props.job} />):null}
        {props.hobbies? (<ProfileField label="Hobbies" value={props.hobbies} />):null}
        <ProfileField />
      </View>):null}
     
    </View>
  );
};

export default UserBio;
