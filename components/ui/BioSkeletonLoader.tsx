import { View, Text ,Platform } from "react-native";
import React from "react";
import Animated, {
    Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { IconURL } from "@/constants/IconURL";
import { textLight0Dark500 } from "@/styles/theme";
import { formatDate } from "@/utils/DateFormatter";
import ProfileField from "./ProfileField";

const BioSkeletonLoader = () => {
  const pulse = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: pulse.value,
    };
  });

  pulse.value = withRepeat(
    withSequence(
      withTiming(0.8, { duration: 1000, easing: Easing.ease }),
      withTiming(1, { duration: 1000, easing: Easing.ease })
    ),
    -1,
    true
  );

  return (
    <View
      className={`${
        Platform.OS === "ios" ? "top-[200px] " : "top-[220px]"
      } flex-1 px-[12px]`}
    >
      <View className="flex">
        <Animated.View className="w-[100px] h-[10px] rounded-full bg-skeleton" />
        <View
          className="flex flex-row items-center border-t-[0.5px] border-fieldBorder h-[37px] "
          style={{ columnGap: 14 }}
        >
          <Animated.View className="w-[70px] h-[8px] rounded-full bg-skeleton" />
          <Animated.View className="w-[170px] h-[8px] rounded-full bg-skeleton" />
        </View>
        <View
          className="flex flex-row items-center border-t-[0.5px] border-fieldBorder h-[37px] "
          style={{ columnGap: 14 }}
        >
          <Animated.View className="w-[70px] h-[8px] rounded-full bg-skeleton" />
          <Animated.View className="w-[170px] h-[8px] rounded-full bg-skeleton" />
        </View>
        <View
          className="flex flex-row items-center border-t-[0.5px] border-fieldBorder h-[37px] "
          style={{ columnGap: 14 }}
        >
          <Animated.View className="w-[70px] h-[8px] rounded-full bg-skeleton" />
          <Animated.View className="w-[170px] h-[8px] rounded-full bg-skeleton" />
        </View>
        <View
          className="flex flex-row items-center border-t-[0.5px] border-fieldBorder h-[37px] "
          style={{ columnGap: 14 }}
        >
          <Animated.View className="w-[70px] h-[8px] rounded-full bg-skeleton" />
          <Animated.View className="w-[170px] h-[8px] rounded-full bg-skeleton" />
        </View>
        <View
          className="flex flex-row items-center border-t-[0.5px] border-fieldBorder h-[37px] "
          style={{ columnGap: 14 }}
        ></View>
      </View>

      <View className="flex">
        <Animated.View className="w-[100px] h-[10px] rounded-full bg-skeleton" />
        <View
          className="flex flex-row items-center border-t-[0.5px] border-fieldBorder h-[37px] "
          style={{ columnGap: 14 }}
        >
          <Animated.View className="w-[70px] h-[8px] rounded-full bg-skeleton" />
          <Animated.View className="w-[170px] h-[8px] rounded-full bg-skeleton" />
        </View>
        <View
          className="flex flex-row items-center border-t-[0.5px] border-fieldBorder h-[37px] "
          style={{ columnGap: 14 }}
        >
          <Animated.View className="w-[70px] h-[8px] rounded-full bg-skeleton" />
          <Animated.View className="w-[170px] h-[8px] rounded-full bg-skeleton" />
        </View>
        <View
          className="flex flex-row items-center border-t-[0.5px] border-fieldBorder h-[37px] "
          style={{ columnGap: 14 }}
        >
          <Animated.View className="w-[70px] h-[8px] rounded-full bg-skeleton" />
          <Animated.View className="w-[170px] h-[8px] rounded-full bg-skeleton" />
        </View>
        <View
          className="flex flex-row items-center border-t-[0.5px] border-fieldBorder h-[37px] "
          style={{ columnGap: 14 }}
        ></View>
      </View>

      <View className="flex">
        <Animated.View className="w-[100px] h-[10px] rounded-full bg-skeleton" />
        <View
          className="flex flex-row items-center border-t-[0.5px] border-fieldBorder h-[37px] "
          style={{ columnGap: 14 }}
        >
          <Animated.View className="w-[70px] h-[8px] rounded-full bg-skeleton" />
          <Animated.View className="w-[170px] h-[8px] rounded-full bg-skeleton" />
        </View>
        <View
          className="flex flex-row items-center border-t-[0.5px] border-fieldBorder h-[37px] "
          style={{ columnGap: 14 }}
        >
          <Animated.View className="w-[70px] h-[8px] rounded-full bg-skeleton" />
          <Animated.View className="w-[170px] h-[8px] rounded-full bg-skeleton" />
        </View>
        <View
          className="flex flex-row items-center border-t-[0.5px] border-fieldBorder h-[37px] "
          style={{ columnGap: 14 }}
        ></View>
      </View>
    </View>
  );
};

export default BioSkeletonLoader;
