import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "./Icon";
import { IconURL } from "@/constants/IconURL";

const SunMoonSwitch = ({ isDarkMode,setIsDarkMode }: any) => {
  const toggleSwitch = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <TouchableOpacity
      onPress={toggleSwitch}
      style={[
        styles.containerSwitch,
        { backgroundColor: isDarkMode ? "#FFFFFF" : "#FFAB66" },
      ]}
    >
      <View
        style={[
          styles.circle,
          { transform: [{ translateX: isDarkMode ? 20 : 0 }] },
        ]}
      >
        <Icon size={26} iconURL={isDarkMode ? IconURL.moon : IconURL.sun}></Icon>
      </View>
    </TouchableOpacity>
  );
};

export default SunMoonSwitch;
const styles = StyleSheet.create({
  containerSwitch: {
    borderRadius: 15,
    width: 50,
    height: 28,
    justifyContent: "center",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  imageBackground: {
    flex: 1,
    width: 30,
    height: 30,
  },
});
