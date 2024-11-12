import { View, Text } from "react-native";
import React from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  withSequence,
} from "react-native-reanimated";

const HeadProfileSkeletonLoader = () => {
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
    <View className="flex items-center justify-center relative">
      <Animated.View
        className="w-screen h-[200px] bg-skeleton"
        style={animatedStyle}
      />
      <View
        className=" flex items-center justify-center absolute top-[90px]"
        style={{ rowGap: 8 }}
      >
        <Animated.View
          className="w-[176px] h-[176px] bg-skeleton rounded-full"
          style={animatedStyle}
        />
        <Animated.View
          className="w-[150px] h-[16px] rounded-full bg-skeleton"
          style={animatedStyle}
        />
        <Animated.View
          className="w-[100px] h-[14px] rounded-full bg-skeleton"
          style={animatedStyle}
        />

        <View
          className="flex flex-row items-center justify-center"
          style={{ columnGap: 8 }}
        >
          <Animated.View
            className="w-[100px] h-[12px] rounded-full bg-skeleton"
            style={animatedStyle}
          />
          <Animated.View
            className="w-[20px] h-[12px] rounded-full bg-skeleton"
            style={animatedStyle}
          />
        </View>
        <Animated.View
          className="w-[280px] h-[8px] rounded-full bg-skeleton"
          style={animatedStyle}
        />
        <Animated.View
          className="w-[280px] h-[8px] rounded-full bg-skeleton"
          style={animatedStyle}
        />
      </View>
    </View>
  );
};

export default HeadProfileSkeletonLoader;
