import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const DenyButton = ({ label, width, height, onPress, fontSize }: any) => {
  return (
    <TouchableOpacity
      className={`flex justify-center items-center rounded-full bg-deny`}
      onPress={onPress}
      style={{width:width, height:height}}
    >
      <Text className="text-white  text-12 font-helvetica-bold" style={{fontSize:fontSize}}>{label}</Text>
    </TouchableOpacity>
  );
};

export default DenyButton;
