import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import OutsidePressHandler, { EventProvider } from "react-native-outside-press";

const index = ({ children }: any) => {
  return (
    <SafeAreaProvider>
      <View className="flex-1 items-center justify-center h-full w-full">
        <Link href="/sign-in">Start</Link>
      </View>
      <EventProvider>{children}</EventProvider>
    </SafeAreaProvider>
  );
};

export default index;

const styles = StyleSheet.create({});
