import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";

const TypingIndicator = () => {
  // Shared values for each dot animation
  const dot1 = useSharedValue(0);
  const dot2 = useSharedValue(0);
  const dot3 = useSharedValue(0);

  useEffect(() => {
    // Animate each dot with repeat and opacity animation
    dot1.value = withRepeat(
      withTiming(1, { duration: 400, easing: Easing.inOut(Easing.ease) }),
      -1, // Infinite loop
      true // Reverse animation after finishing one cycle
    );

    dot2.value = withRepeat(
      withTiming(1, { duration: 400, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );

    dot3.value = withRepeat(
      withTiming(1, { duration: 400, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  // Animated styles for each dot with varying opacity
  const animatedStyle1 = useAnimatedStyle(() => ({
    opacity: dot1.value,
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    opacity: dot2.value,
  }));

  const animatedStyle3 = useAnimatedStyle(() => ({
    opacity: dot3.value,
  }));

  return (
    <View className="flex-1 items-start justify-center">
      <View className=" bg-ios-light-340 dark:bg-ios-dark-330 w-[60px] h-[34px] rounded-full items-center justify-center flex flex-row p-[8px]" style={{columnGap:4}}>
        <Animated.View style={[styles.dot, animatedStyle1]} />
        <Animated.View style={[styles.dot, animatedStyle2]} />
        <Animated.View style={[styles.dot, animatedStyle3]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    width:6,
    height: 6,
    backgroundColor: "#000",
    borderRadius: 5,
  },
});

export default TypingIndicator;
