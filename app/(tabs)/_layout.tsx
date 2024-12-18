import { View, Text, Image, Dimensions, AppState } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, Tabs } from "expo-router";
import { IconURL } from "@/constants/IconURL";
import TabIcon from "@/components/ui/TabIcon";
import TabBar from "@/components/navigator/Tabbar/TabBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getMyProfile } from "@/lib/my-profile";
import { checkIn, checkOut } from "@/lib/local-auth";
const HomeLayout = () => {
  const [appState, setAppState] = useState(AppState.currentState);

  // Lắng nghe sự thay đổi trạng thái của ứng dụng
  useEffect(() => {
    const fetchData = async () => {
      await getMyProfile();
      await checkIn();
    };

    fetchData();

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // Cleanup khi component unmount
    return () => {
      subscription.remove();
      // Đảm bảo gọi checkout khi ứng dụng bị tắt hoặc chuyển sang nền
      if (appState === 'active') {
        checkOut();
      }
    };
  }, [appState]);

  const handleAppStateChange = (nextAppState:any) => {
    if (appState.match(/active/) && nextAppState === 'background') {
      checkOut(); 
    }
    setAppState(nextAppState);
  };
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
