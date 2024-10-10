import { View, Text, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { IconURL } from "@/constants/IconURL";
import { TouchableOpacity } from "react-native-gesture-handler";
import { textLight330Dark500 } from "@/styles/theme";
import { useTheme } from "@/context/ThemeProviders";
import Icon from "./Icon";

const SecretInput = ({ placeHolder, iconURL, onChangeText }: any) => {
  const [isShow, setIsShow] = useState(false);
  const { theme } = useTheme();
  return (
    <View className="flex flex-row">
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
        placeholderTextColor={theme === "light" ? "#565A59" : "#FFFFFF"}
        secureTextEntry={isShow ? false : true}
        pointerEvents="auto"
      ></TextInput>
      <View className="absolute right-[14px] top-[13px] z-10">
        <TouchableOpacity onPress={() => setIsShow(!isShow)}>
          <Image
            source={
              isShow
                ? theme === "light"
                  ? IconURL.show_l
                  : IconURL.show_d
                : theme === "light"
                ? IconURL.hide_l
                : IconURL.hide_d
            }
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SecretInput;
