import React, { Children } from "react";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MainHeader from "@/components/navigator/Topbar/MainHeader";
import { EventProvider } from "react-native-outside-press";
import { ThemeProvider } from "@/context/ThemeProviders";
import { ClickOutsideProvider } from "react-native-click-outside";
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

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;
  // const tokenCache = {
  //   async getToken(key: string) {
  //     try {
  //       const item = await SecureStore.getItemAsync(key);
  //       if (item) {
  //         console.log(`${key} was used 🔐 \n`);
  //       } else {
  //         console.log("No values stored under key: " + key);
  //       }
  //       return item;
  //     } catch (error) {
  //       console.error("SecureStore get item error: ", error);
  //       await SecureStore.deleteItemAsync(key);
  //       return null;
  //     }
  //   },
  //   async saveToken(key: string, value: string) {
  //     try {
  //       return SecureStore.setItemAsync(key, value);
  //     } catch (err) {
  //       return;
  //     }
  //   },
  // };

  // const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  // if (!publishableKey) {
  //   throw new Error(
  //     "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  //   );
  // }
  
  return (
    <GestureHandlerRootView>
      <EventProvider>
      <ThemeProvider>
        <ClickOutsideProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              headerTitle: (props) => <MainHeader></MainHeader>,
            }}
          />
          <Stack.Screen name="chatbox" options={{headerShown:false}}/>
          <Stack.Screen name="(saved)/my-multimedia" options={{headerShown:false}}/>
        </Stack>
        </ClickOutsideProvider>
        </ThemeProvider>
      </EventProvider>
    </GestureHandlerRootView>
  );
}
