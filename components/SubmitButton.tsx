import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const SubmitButton = ({ label, isPressed, onPress }: any) => {
  return (
    <TouchableOpacity
      className={`flex justify-center items-center w-[160px] h-[40px] rounded-full ${
        isPressed ? "bg-hover1" : "bg-cardinal"
      }`}
      onPress={onPress}
    >
      <Text className="text-white dark:text-black text-18 font-bold">
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;
