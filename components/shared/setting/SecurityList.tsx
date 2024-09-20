import { View, Text } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SettingSecurityProps } from "@/constants/SettingItem";
import SettingItem from "./SettingItem";

const SecurityList = () => {
  return (
    <ScrollView className="mt-[60px]">
      {SettingSecurityProps.map((item) => (
        <SettingItem
          label={item.label}
          link={item.link}
          key={item.index}
        ></SettingItem>
      ))}
    </ScrollView>
  );
};

export default SecurityList;
