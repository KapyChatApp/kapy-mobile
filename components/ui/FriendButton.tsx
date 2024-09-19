import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const FriendButton = ({ type, width, height, onPress, label }: any) => {
  return (
    <TouchableOpacity
      className={`flex justify-center items-center rounded-full ${
        type ? "bg-specialRelation" : "bg-cardinal"
      }`}
      style={{ width: width, height: height }}
      onPress={onPress}
    >
      <Text className="text-white text-12 font-helvetica-bold">{label}</Text>
    </TouchableOpacity>
  );
};

export default FriendButton;
