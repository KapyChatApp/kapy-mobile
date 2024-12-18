import { IconURL } from "@/constants/IconURL";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  LayoutChangeEvent,
} from "react-native";
import TabIcon from "../../ui/TabIcon";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import TabBarButton from "./TabBarButton";
import { bgLight100Dark0 } from "@/styles/theme";
import { useTheme } from "@/context/ThemeProviders";
import { useCamera } from "@/context/CameraContext";
const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { theme } = useTheme();
  const {isCameraOpen} = useCamera();
  const [dimensions, setDimensions] = useState({ height: 70, width: 250 });
  const [selected, setSelected] = useState("message");
  const buttonWidth = dimensions.width / state.routes.length;
  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };
  const tabPositionX = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });
  return (
    <View
      onLayout={onTabbarLayout}
      style={{ flexDirection: "row", display:isCameraOpen? "none":"flex" }}
      className={`h-[70px]  flex flex-row items-center justify-around bg-white dark:bg-black border-t-[0.25px] border-border`}
    >
      <Animated.View
        style={[
          animatedStyle,
          {
            position: "absolute",
            backgroundColor: theme === "light" ? "#FFFFFF" : "#000000",
            borderColor: "#F57602",
            borderWidth: 3,
            borderRadius: 90,
            marginLeft: -14,
            height: 56,
            width: 56,
            zIndex: 1,
          },
        ]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, {
            duration: 1500,
          });
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          setSelected(route.name);
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
          ></TabBarButton>
        );
      })}
    </View>
  );
};
export default TabBar;
// ...
