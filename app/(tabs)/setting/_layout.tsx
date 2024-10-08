import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const SettingLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="change-password" options={{ headerShown: false }} />
      <Stack.Screen name="security" options={{headerShown:false}}/>
      <Stack.Screen name="update-profile" options={{headerShown:false}}/>
    </Stack>
  );
};

export default SettingLayout;
