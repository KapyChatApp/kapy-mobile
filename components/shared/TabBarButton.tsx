import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import TabIcon from "../ui/TabIcon";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { IconURL } from "@/constants/IconURL";
const TabIcons = {
  message: (props: any) => <TabIcon iconURL={IconURL.message_d}></TabIcon>,
  friends: (props: any) => <TabIcon iconURL={IconURL.friends_d}></TabIcon>,
  livemap: (props: any) => <TabIcon iconURL={IconURL.livemap_d}></TabIcon>,
  setting: (props: any) => <TabIcon iconURL={IconURL.setting_d}></TabIcon>,
};
const TabBarButton = ({
  onPress,
  onLongPress,
  isFocused,
  routeName,
}: any) => {
  const scale = useSharedValue(0);
  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 }
    );
  }, [scale, isFocused]);
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      className="justify-center items-center z-10"
    >
      {TabIcons[routeName]()}
    </Pressable>
  );
};

export default TabBarButton;
