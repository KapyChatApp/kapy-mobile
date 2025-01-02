import {AppState } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {Tabs } from "expo-router";
import { IconURL } from "@/constants/IconURL";
import TabIcon from "@/components/ui/TabIcon";
import TabBar from "@/components/navigator/Tabbar/TabBar";
import { checkIn, checkOut, registerForPushNotificationsAsync } from "@/lib/local";
const HomeLayout = () => {
  const appState = useRef(AppState.currentState);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCheckedIn, setHasCheckedIn] = useState(false); 
  const [isFirstLaunch, setIsFirstLaunch] = useState(true); 


 
  useEffect(() => {
  
    const handleAppStateChange = async (nextAppState: any) => {
      appState.current = nextAppState;

      if (nextAppState === "active") {
        if (isFirstLaunch) {
          await checkIn();
          setHasCheckedIn(true);
          setIsFirstLaunch(false);
        } else if (!hasCheckedIn) {
          await checkIn();
          setHasCheckedIn(true);
        }
      } else if (nextAppState === "background" && hasCheckedIn) {
        await checkOut();
        setHasCheckedIn(false);
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    const handleAppStateBackground = async () => {
      if (hasCheckedIn) {
        await checkOut();
        setHasCheckedIn(false);
      }
    };

    return () => {
      subscription.remove();
      handleAppStateBackground();
    };
  }, [hasCheckedIn, isFirstLaunch]);

  return (
    <Tabs tabBar={(props) => <TabBar {...props}></TabBar>}>
      <Tabs.Screen
        name="message"
        options={{
          headerShown: false,
          tabBarIcon: () => <TabIcon iconURL={IconURL.message_d}></TabIcon>,
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="friends"
        options={{
          headerShown: false,
          tabBarIcon: () => <TabIcon iconURL={IconURL.friends_d}></TabIcon>,
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="livemap"
        options={{
          headerShown: false,
          tabBarIcon: () => <TabIcon iconURL={IconURL.livemap_d}></TabIcon>,
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="setting"
        options={{
          headerShown: false,
          tabBarIcon: () => <TabIcon iconURL={IconURL.setting_d}></TabIcon>,
        }}
      ></Tabs.Screen>
    </Tabs>
  );
};

export default HomeLayout;
