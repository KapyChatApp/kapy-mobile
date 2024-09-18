import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import TabIcon from "../ui/TabIcon";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { IconURL } from "@/constants/IconURL";
const TabIcons = {
  message: (props: any) => <TabIcon iconURL={IconURL.message_d}></TabIcon>,
  friends: (props: any) => <TabIcon iconURL={IconURL.friends_d}></TabIcon>,
  livemap: (props: any) => <TabIcon iconURL={IconURL.livemap_d}></TabIcon>,
  setting: (props: any) => <TabIcon iconURL={IconURL.setting_d}></TabIcon>,
};

const TabBarButton = ({ onPress, onLongPress, isFocused, routeName }: any) => {
  const scale = useSharedValue(1); // Giá trị ban đầu của scale là 1

  const handlePressIn = () => {
    // Thu nhỏ icon khi nhấn vào
    scale.value = withSpring(0.7, { stiffness: 300, damping: 15 });
  };

  const handlePressOut = () => {
    // Trở lại kích thước ban đầu sau khi nhả
    scale.value = withSpring(1, { stiffness: 300, damping: 15 });
  };

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className="justify-center items-center z-10"
    >
      <Animated.View style={animatedIconStyle}>
        {TabIcons[routeName]()}
      </Animated.View>
    </Pressable>
  );
};

export default TabBarButton;
