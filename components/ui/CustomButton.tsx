import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "./Icon";

const CustomButton = ({
  type,
  width,
  height,
  onPress,
  label,
  fontSize,
  iconURL,
  iconSize,
}: any) => {
  return (
    <TouchableOpacity
      className={`flex justify-center items-center rounded-full ${
        type ? "bg-specialRelation" : "bg-cardinal"
      } flex-row `}
      style={{ width: width, height: height, columnGap: 4 }}
      onPress={onPress}
    >
      {iconURL ? <Icon iconURL={iconURL} size={iconSize} /> : null}
      {label ? (
        <Text
          className="text-white font-helvetica-bold"
          style={{ fontSize: fontSize }}
        >
          {label}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

export default CustomButton;
