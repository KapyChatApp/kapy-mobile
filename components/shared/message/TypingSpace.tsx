import React, { useRef, useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { useTheme } from "@/context/ThemeProviders";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
import { bgLight600Dark300, textLight0Dark500 } from "@/styles/theme";
import Animated, { Easing } from "react-native-reanimated";
import { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";

const TypingSpace = ({
  isTyping,
  setIsTypeping,
  onChangeText,
  value,
  onPress,
  handlePickMedia,
  handlePickDocument,
  setIsCameraOpen,
  setIsMicroOpen,
}: {
  isTyping: boolean;
  setIsTypeping: any;
  onChangeText: (text: string) => void;
  value: any;
  onPress: any;
  handlePickMedia: any;
  handlePickDocument: any;
  setIsCameraOpen: any;
  setIsMicroOpen: any;
}) => {
  const { theme } = useTheme();
  const animatedWidth = useSharedValue(1);

  React.useEffect(() => {
    animatedWidth.value = withTiming(isTyping ? 0 : 1, {
      duration: 150,
      easing: Easing.inOut(Easing.ease),
    });
  }, [isTyping]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: animatedWidth.value * 180, 
    };
  });

  return (
    <View
      className={`w-full h-[66] bg-light-500 dark:bg-dark-0 flex flex-row justify-between items-center px-[10px]`}
      style={{ columnGap: 8 }}
    >
      <Animated.View
        style={[{ flexDirection: "row", justifyContent: "space-between", columnGap: 7 }, animatedStyle]} 
      >
        {!isTyping && (
          <>
            <TouchableOpacity onPress={handlePickDocument}>
              <Icon
                iconURL={theme === "light" ? IconURL.attach_l : IconURL.attach_d}
                size={28}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={setIsMicroOpen}>
              <Icon
                iconURL={theme === "light" ? IconURL.mic_l : IconURL.mic_d}
                size={28}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePickMedia}>
              <Icon
                iconURL={theme === "light" ? IconURL.image_l : IconURL.image_d}
                size={28}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={setIsCameraOpen}>
              <Icon
                iconURL={theme === "light" ? IconURL.opencam_l : IconURL.opencam_d}
                size={28}
              />
            </TouchableOpacity>
          </>
        )}
      </Animated.View>

      {isTyping && (
        <TouchableOpacity
          onPress={() => {
            setIsTypeping(false);
          }}
        >
          <Icon iconURL={IconURL.plus} size={28} />
        </TouchableOpacity>
      )}

      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="Type..."
          placeholderTextColor="#A9A9A9"
          className={`h-[42px] rounded-full ${bgLight600Dark300} px-[12px] ${textLight0Dark500} font-helvetica-light`}
          onFocus={() => setIsTypeping(true)}
          onChangeText={(text)=>{ setIsTypeping(true);onChangeText(text);}}
          value={value}
        />
      </View>

      <View>
        <TouchableOpacity onPress={onPress}>
          <Icon iconURL={IconURL.send} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TypingSpace;
