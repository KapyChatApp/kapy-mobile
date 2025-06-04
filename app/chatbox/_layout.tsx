import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const ChatBoxLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="[messageId]" options={{ headerShown: false }} />
      <Stack.Screen name="chatbox-detail" options={{ headerShown: false }} />
      <Stack.Screen name="multimedia" options={{ headerShown: false }} />
      <Stack.Screen name="members" options={{ headerShown: false }} />
      <Stack.Screen
        name="video-call/[userId]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="audio-call/[userId]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="group-call/[groupId]"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default ChatBoxLayout;
