import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import OutsidePressHandler, { EventProvider } from "react-native-outside-press";
import { bgLight500Dark10 } from "@/styles/theme";

const index = () => {
  return (
    <SafeAreaProvider>
      <View className={`flex-1 items-center justify-center h-full w-full ${bgLight500Dark10}`}>
      </View>
    </SafeAreaProvider>
  );
};

export default index;
