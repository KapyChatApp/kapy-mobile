import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({ type, width, height, onPress, label, fontSize }: any) => {
  return (
    <TouchableOpacity
      className={`flex justify-center items-center rounded-full ${
        type ? "bg-specialRelation" : "bg-cardinal"
      }`}
      style={{ width: width, height: height }}
      onPress={onPress}
    >
      <Text className="text-white font-helvetica-bold" style={{fontSize:fontSize}}> {label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
