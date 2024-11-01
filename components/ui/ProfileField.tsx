import { View, Text } from "react-native";
import React from "react";
import { ProfileFieldProps } from "@/types/ui-props";
import { textLight350Dark500 } from "@/styles/theme";
import Icon from "./Icon";

const ProfileField = (props: ProfileFieldProps) => {
  return (
    <View className="flex flex-row items-center border-t-[0.5px] border-fieldBorder h-[37px] " style={{ columnGap: 14 }}>
      <Text
        className={`pl-[40px] ${textLight350Dark500} font-helvetica-light text-14`}
      >
        {props.label}
      </Text>
      <Text className={`${textLight350Dark500} font-helvetica-bold text-1`}>
        {props.value}
      </Text>
      <Icon iconURL={props.iconURL} size={18}/>
    </View>
  );
};

export default ProfileField;
