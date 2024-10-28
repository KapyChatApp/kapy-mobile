import { View, Text, TextInput, Image, Keyboard, Touchable } from "react-native";
import React from "react";
import { IconInputField } from "@/types/ui-props";
import { textLight330Dark500 } from "@/styles/theme";
import { useTheme } from "@/context/ThemeProviders";
import { useClickOutside } from "react-native-click-outside";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const DataInputBig = ({ iconURL, placeHolder, onChangeText }: any) => {
  const {theme} = useTheme();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Image
        source={iconURL}
        className="w-[28px] h-[28px] absolute top-[8px] left-[15px]"
      ></Image>
      <Image
        source={require("../../assets/icons/line.png")}
        className="h-[36px] w-[1px] absolute left-[52px] top-1 "
      ></Image>
      <TextInput
        className={`h-auth-input w-auth-input text-14 py-auth-input-y px-auth-input-x border border-l_input rounded-full pl-[63px] font-helvetica-light ${textLight330Dark500}`}
        placeholder={placeHolder}
        onChangeText={onChangeText}
        placeholderTextColor={theme==='light'? "#565A59":"#FFFFFF"}
      ></TextInput>
    </TouchableWithoutFeedback>
  );
};

export default DataInputBig;
