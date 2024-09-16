import { View, Text, Image } from "react-native";
import React from "react";

const TabIcon = ({ iconURL }: any) => {
  return <><Image source={iconURL} className="w-[28px] h-[28px] z-20"></Image></>;
};

export default TabIcon;
