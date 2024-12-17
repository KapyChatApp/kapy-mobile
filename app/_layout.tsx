import React, { Children, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import {
  Slot,
  SplashScreen,
  Stack,
  useNavigation,
  useRouter,
} from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import {
  DrawerLayoutAndroid,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import MainHeader from "@/components/navigator/Topbar/MainHeader";
import { EventProvider } from "react-native-outside-press";
import { ThemeProvider } from "@/context/ThemeProviders";
import { ClickOutsideProvider } from "react-native-click-outside";
import { Drawer } from "expo-router/drawer";
import {
  Dimensions,
  DrawerLayoutAndroidBase,
  SafeAreaView,
} from "react-native";
import TopBar from "@/components/navigator/Topbar/TopBar";
import BFFListPage from "./(mine)/bff-list";
import ActionSheet from "react-native-actions-sheet";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import axios from "axios";
import { MarkReadProvider } from "@/context/MarkReadProvider";
import { View } from "react-native";
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    Helvetica_Bold: require("../assets/fonts/helvetica-neue-bold.ttf"),
    "Helvetica-Bold-Italic": require("../assets/fonts/helvetica-neue-bold-italic.ttf"),
    "Helvetica-Light": require("../assets/fonts/helvetica-neue-light.ttf"),
    "Helvetica-Light-Italic": require("../assets/fonts/helveticaneuelightitalic.ttf"),
    "Helvetica-Regular": require("../assets/fonts/helvetica-neue-regular.ttf"),
    "Helvetica-Ultra-Light": require("../assets/fonts/helveticaneueultralight.ttf"),
    "Helvetica-Ultra-Light-Italic": require("../assets/fonts/helveticaneueultralightitalic.ttf"),
  });
  const router = useRouter();
  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;
      try {
        const res = await axios.post(
          process.env.EXPO_PUBLIC_BASE_URL + "/auth/check-token",
          { token: token }
        );
        if (res.data.isAuthenticated) {
          router.push("/(tabs)/message");
        } else {
          router.push("/(auth)/sign-in");
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    checkToken();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <GestureHandlerRootView className="flex-1 bg-white dark:bg-black">
      <EventProvider>
        <ThemeProvider>
          <SafeAreaView className="flex-1">
            <MarkReadProvider>
              <ClickOutsideProvider>
                <ActionSheetProvider>
                  <Stack>
                    <Stack.Screen
                      name="index"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(auth)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(tabs)"
                      options={{
                        headerShown: false,
                        headerTitle: (props) => <MainHeader></MainHeader>,
                      }}
                    />
                    <Stack.Screen
                      name="chatbox"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(mine)/my-multimedia"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(mine)/my-wall"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(mine)/blocked-list"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(mine)/bff-list"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(mine)/my-groups"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(mine)/all-rate"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="community"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(error)/not-found"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="report"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen name="friend" options={{headerShown:false}}/>
                  </Stack>
                </ActionSheetProvider>
              </ClickOutsideProvider>
            </MarkReadProvider>
          </SafeAreaView>
        </ThemeProvider>
      </EventProvider>
    </GestureHandlerRootView>
  );
}
