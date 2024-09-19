import { View, Text } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";

const BaseInput = ({ width, height, label, onChangeText,isSecuriy }: any) => {
  return (
    <View className="flex gap-y-[2px]">
      <Text className="font-helvetica-light text-14">{label}</Text>
      <TextInput
        secureTextEntry={isSecuriy}
        className={` rounded-full px-[20px] py-[10px] text-1 border border-border`}
        placeholder="Ex:123456789@Aa*"
        onChangeText={onChangeText}
        placeholderTextColor="#A9A9A9"
        style={{ width: width, height: height }}
      ></TextInput>
    </View>
  );
};

export default BaseInput;
