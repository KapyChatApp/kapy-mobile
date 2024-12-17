import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import TabIcon from "../../ui/TabIcon";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { IconURL } from "@/constants/IconURL";

const TabIcons = {
  message: {
    nonSelected: <TabIcon iconURL={IconURL.chat_non_select} />,
    selected: <TabIcon iconURL={IconURL.chat_select} />,
  },
  friends: {
    nonSelected: <TabIcon iconURL={IconURL.friends_non_select} />,
    selected: <TabIcon iconURL={IconURL.friends_select} />,
  },
  livemap: {
    nonSelected: <TabIcon iconURL={IconURL.map_non_select} />,
    selected: <TabIcon iconURL={IconURL.map_select} />,
  },
  setting: {
    nonSelected: <TabIcon iconURL={IconURL.setting_non_select} />,
    selected: <TabIcon iconURL={IconURL.setting_select} />,
  },
};
type RouteName = keyof typeof TabIcons;

const TabBarButton = ({
  onPress,
  onLongPress,
  isFocused,
  routeName,
}: {
  onPress: any;
  onLongPress: any;
  isFocused: boolean; // Đảm bảo isFocused là boolean
  routeName: RouteName;
}) => {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.7, { stiffness: 300, damping: 15 });
  };

  const handlePressOut = () => {
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
        {isFocused
          ? TabIcons[routeName].selected // Hiển thị icon đã chọn
          : TabIcons[routeName].nonSelected // Hiển thị icon chưa chọn
        }
      </Animated.View>
    </Pressable>
  );
};

export default TabBarButton;
