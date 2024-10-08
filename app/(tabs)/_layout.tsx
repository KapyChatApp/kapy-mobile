import { View, Text, Image, Dimensions } from "react-native";
import React, { useState } from "react";
import { Stack, Tabs } from "expo-router";
import { IconURL } from "@/constants/IconURL";
import TabIcon from "@/components/ui/TabIcon";
import TabBar from "@/components/navigator/Tabbar/TabBar";
import "@/styles/theme.css"
const HomeLayout = () => {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props}></TabBar>}
      sceneContainerStyle={{ zIndex: 1 }}
    >
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
