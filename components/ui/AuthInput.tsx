import { View, Text, TextInput, Image } from "react-native";
import React from "react";
import { IconInputField } from "@/types/ui-props";

const DataInputBig = ({ iconURL, placeHolder, onChangeText }: any) => {
  return (
    <View>
      <Image
        source={iconURL}
        className="w-[28px] h-[28px] absolute top-[8px] left-[15px]"
      ></Image>
      <Image source={require("../../assets/icons/line.png")}
        className="h-[36px] w-[1px] absolute left-[52px] top-1 "
      ></Image>
      <TextInput
        className="h-auth-input w-auth-input text-14 py-auth-input-y px-auth-input-x border border-l_input rounded-full text-l_input dark:text-white pl-[63px] font-helvetica-light"
        placeholder={placeHolder}
        onChangeText={onChangeText}
        placeholderTextColor="#565A59"
      ></TextInput>
    </View>
  );
};

export default DataInputBig;
