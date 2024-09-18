import { View, Text, Image } from "react-native";
import React from "react";

const Icon = ({ iconURL, size }: any) => {
  return (
    <Image source={iconURL} className={`w-[${size}px] h-[${size}px]`}></Image>
  );
};

export default Icon;
