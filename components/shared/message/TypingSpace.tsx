import { View, Text } from "react-native";
import React from "react";
import {
  bgLight500Dark0,
  bgLight500Dark10,
  bgLight600Dark300,
  textLight0Dark500,
} from "@/styles/theme";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IconURL } from "@/constants/IconURL";
import Icon from "@/components/ui/Icon";
import { useTheme } from "@/context/ThemeProviders";

const TypingSpace = () => {
  const { theme } = useTheme();
  return (
    <View
      className={`w-full h-[66] bg-light-500 dark:bg-dark-0 flex flex-row justify-between items-center px-[10px]`}
      style={{ columnGap: 15 }}
    >
      <View
        className="flex flex-row items-center justify-between"
        style={{ columnGap: 11 }}
      >
        <TouchableOpacity>
          <Icon
            iconURL={
              theme === "light"
                ? IconURL.chat_func_more_l
                : IconURL.chat_func_more_d
            }
            size={28}
          ></Icon>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon
            iconURL={theme === "light" ? IconURL.mic_l : IconURL.mic_d}
            size={28}
          ></Icon>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon
            iconURL={theme === "light" ? IconURL.image_l : IconURL.image_d}
            size={28}
          ></Icon>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon
            iconURL={theme === "light" ? IconURL.opencam_l : IconURL.opencam_d}
            size={28}
          ></Icon>
        </TouchableOpacity>
      </View>
      <View className="flex-1">
        <TextInput
          placeholder="Type..."
          placeholderTextColor="#A9A9A9"
          className={`h-[42px] w-full rounded-full ${bgLight600Dark300} px-[12px] ${textLight0Dark500} font-helvetica-light`}
        ></TextInput>
      </View>
      <TouchableOpacity>
        <Icon iconURL={IconURL.icon} size={40}></Icon>
      </TouchableOpacity>
    </View>
  );
};

export default TypingSpace;
