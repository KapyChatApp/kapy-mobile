// LoadingSpinner.js
import { IconURL } from "@/constants/IconURL";
import { useTheme } from "@/context/ThemeProviders";
import React, { useEffect } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const LoadingSpinner = ({
  loading,
  title,
  fullScreen,
}: {
  loading: boolean;
  title?: string;
  fullScreen?: boolean;
}) => {
  const { theme } = useTheme();

  const rotation = useSharedValue(0);
  const spinnerScale = useSharedValue(1);
  const tickScale = useSharedValue(0);

  useEffect(() => {
    if (loading) {
      rotation.value = withRepeat(
        withTiming(1, {
          duration: 1000,
          easing: Easing.linear,
        }),
        -1,
        false
      );
    } else {
      spinnerScale.value = withTiming(0, { duration: 300 });
      setTimeout(() => {
        tickScale.value = withTiming(1, { duration: 300 });
      }, 300);
    }
  }, [loading, rotation, spinnerScale, tickScale]);

  const spinnerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value * 360}deg` },
        { scale: spinnerScale.value },
      ],
    };
  });

  const tickStyle = useAnimatedStyle(() => {
    return {
      opacity: loading ? 0 : 1,
      transform: [{ scale: tickScale.value }],
    };
  });

  return (
    <View style={styles.overlay}>
      <View
        className={`${
          fullScreen ? "w-screen h-screen absolute" : "absolute w-[120px] h-[120px]"
        }  rounded-xl bg-white dark:bg-black flex-1 items-center justify-center `}
        style={{ elevation: 5, rowGap: 12 }}
      >
        <Animated.View style={[styles.spinner, spinnerStyle]} />
        <Animated.Image
          source={IconURL.tick}
          style={[styles.tick, tickStyle]}
          resizeMode="contain"
        />
        {title ? (
          <Text className="font-helvetica-bold text-14  text-cardinal">
            {title}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  spinner: {
    width: 50,
    height: 50,
    borderWidth: 4,
    borderColor: "#F57602",
    borderTopColor: "transparent",
    borderRadius: 25,
  },
  tick: {
    width: 50,
    height: 50,
    position: "absolute",
  },
});

export default LoadingSpinner;
