import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { EventProvider } from "react-native-outside-press";

const FriendLayout = ({ children }: any) => {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="all-request" options={{ headerShown: false }} />
    </Stack>
  );
};

export default FriendLayout;
