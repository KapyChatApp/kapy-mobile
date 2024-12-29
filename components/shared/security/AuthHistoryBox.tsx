import { View, Text, Modal } from "react-native";
import React from "react";
import { AuthHistoryProps } from "@/types/security";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import { formatDate } from "@/utils/DateFormatter";

const AuthHistoryBox = (props: AuthHistoryProps) => {
  return (
    <View className="w-full flex flex-row items-center py-[10px] px-[20px] bg-whitesmoke dark:bg-dark-20 border border-border rounded-2xl" style={{columnGap:40}}>
      <View className="w-[70px] h-[70px] rounded-full flex items-center justify-center">
        <Icon
          iconURL={
            props.deviceType === "PHONE"
              ? IconURL.phone
              : props.deviceType === "TABLET"
              ? IconURL.tablet
              : IconURL.desktop
          }
          size={50}
        />
      </View>
      <View className="flex" style={{ rowGap: 4 }}>
        <Text className={`${textLight0Dark500} font-helvetica-bold text-14`}>
          {props.modelName + " (" + props.deviceName + ")"}
        </Text>
        <Text
          className={`text-12 ${
            props.isActive
              ? "font-helvetica-bold text-cardinal"
              : "font-helvetica-regular"
          } ${props.isActive ? "" : textLight0Dark500}`}
        >
          {props.isActive ? "Active" : "Logged out"}
        </Text>
        <Text className={`${textLight0Dark500} font-helvetica-regular text-12`}>
          {formatDate(props.createAt)}
        </Text>
        <Text className={`${textLight0Dark500} font-helvetica-regular text-12`}>
          {props.osName + " - " + props.osVersion}
        </Text>
        <Text className={`${textLight0Dark500} font-helvetica-regular text-12`}>
          {props.region}
        </Text>
      </View>
    </View>
  );
};

export default AuthHistoryBox;
