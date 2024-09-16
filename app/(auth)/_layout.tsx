import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";

const AuthLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "helvetica-bold": require("../../assets/fonts/helvetica-neue-bold.ttf"),
    "helvetica-bold-italic": require("../../assets/fonts/helvetica-neue-bold-italic.ttf"),
    "helvetica-light": require("../../assets/fonts/helvetica-neue-light.ttf"),
    "helvetica-light-italic": require("../../assets/fonts/helveticaneuelightitalic.ttf"),
    "helvetica-regular": require("../../assets/fonts/helvetica-neue-regular.ttf"),
    "helvetica-ultra-light": require("../../assets/fonts/helveticaneueultralight.ttf"),
    "helvetica-ultra-light-italic": require("../../assets/fonts/helveticaneueultralightitalic.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password" options={{headerShown:false}}/>
      <Stack.Screen name="verify-code" options={{headerShown:false}}/>
    </Stack>
  );
};

export default AuthLayout;
