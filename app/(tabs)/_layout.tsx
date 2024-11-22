import { View, Text, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, Tabs } from "expo-router";
import { IconURL } from "@/constants/IconURL";
import TabIcon from "@/components/ui/TabIcon";
import TabBar from "@/components/navigator/Tabbar/TabBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getMyProfile } from "@/lib/my-profile";
const HomeLayout = () => {
  useEffect(() => {
    const fetchData = async () => {
      const localUserData = await getMyProfile();
      console.log("localuser: ", localUserData);
    };
    fetchData();
  }, []);
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
