import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const DenyButton = ({ label, onPress }: any) => {
  return (
    <TouchableOpacity
      className="flex justify-center items-center w-[93px] h-[31px] rounded-full bg-deny"
      onPress={onPress}
    >
      <Text className="text-white dark:text-black text-12 font-helvetica-bold">
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default DenyButton;
