import { View, Text, Platform } from "react-native";
import React, { useState } from "react";
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
import Popover, { PopoverPlacement } from "react-native-popover-view";

const TypingSpace = ({
  isTyping,
  setIsTypeping,
  onChangeText,
  value,
  onPress,
  handlePickMedia,
  setIsCameraOpen
}: any) => {
  const { theme } = useTheme();
  return (
    <View
      className={`w-full h-[66] bg-light-500 dark:bg-dark-0 flex flex-row justify-between items-center px-[10px]`}
      style={{ columnGap: 8 }}
    >
      {isTyping ? null : (
        <View
          className="flex flex-row items-center justify-between"
          style={{ columnGap: 11 }}
        >
          <Popover
            offset={Platform.OS === "ios" ? 10 : 40}
            arrowSize={{ width: -2, height: -2 }}
            placement={PopoverPlacement.TOP}
            backgroundStyle={{ backgroundColor: "transparent" }}
            from={
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
            }
          >
            <TouchableOpacity>
              <View
                className={`flex flex-row items-center  ${bgLight500Dark10} p-[13px]`}
                style={{ columnGap: 12 }}
              >
                <Icon
                  iconURL={
                    theme === "light" ? IconURL.attach_l : IconURL.attach_d
                  }
                  size={28}
                />
                <Text className={`${textLight0Dark500} text-12`}>
                  Attachment
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                className={`flex flex-row items-center  ${bgLight500Dark10} p-[13px]`}
                style={{ columnGap: 12 }}
              >
                <Icon
                  iconURL={
                    theme === "light" ? IconURL.location_l : IconURL.location_d
                  }
                  size={28}
                />
                <Text className={`${textLight0Dark500} text-12`}>Location</Text>
              </View>
            </TouchableOpacity>
          </Popover>
          <TouchableOpacity>
            <Icon
              iconURL={theme === "light" ? IconURL.mic_l : IconURL.mic_d}
              size={28}
            ></Icon>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePickMedia}>
            <Icon
              iconURL={theme === "light" ? IconURL.image_l : IconURL.image_d}
              size={28}
            ></Icon>
          </TouchableOpacity>
          <TouchableOpacity onPress={setIsCameraOpen}>
            <Icon
              iconURL={
                theme === "light" ? IconURL.opencam_l : IconURL.opencam_d
              }
              size={28}
            ></Icon>
          </TouchableOpacity>
        </View>
      )}
      {isTyping ? (
        <TouchableOpacity
          onPress={() => {
            setIsTypeping(false);
          }}
        >
          <Icon iconURL={IconURL.plus} size={28} />
        </TouchableOpacity>
      ) : null}
      <View className="flex-1">
        <TextInput
          placeholder="Type..."
          placeholderTextColor="#A9A9A9"
          className={`h-[42px] w-full rounded-full ${bgLight600Dark300} px-[12px] ${textLight0Dark500} font-helvetica-light`}
          onFocus={() => setIsTypeping(true)}
          onChangeText={onChangeText}
          value={value}
        ></TextInput>
      </View>
   
        <View>
          <TouchableOpacity  onPress={onPress} >
            <Icon iconURL={IconURL.send} size={30}/>
          </TouchableOpacity>
        </View>
      
    </View>
  );
};

export default TypingSpace;
