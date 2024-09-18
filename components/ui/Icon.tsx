import { View, Text, Image } from "react-native";
import React from "react";

const Icon = ({ iconURL, size }: any) => {
  return <Image source={iconURL} style={{ width: size, height: size }}></Image>;
};

export default Icon;
