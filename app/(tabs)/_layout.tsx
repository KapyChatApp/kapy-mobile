import { View, Text, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, Tabs } from "expo-router";
import { IconURL } from "@/constants/IconURL";
import TabIcon from "@/components/ui/TabIcon";
import TabBar from "@/components/navigator/Tabbar/TabBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const HomeLayout = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const response = await axios.get(
          process.env.EXPO_PUBLIC_BASE_URL + "/mine/profile",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );
        const userData = response.data;
        await AsyncStorage.setItem("user", JSON.stringify(userData));
      } catch (err) {
        console.log(err);
        throw err;
      }
    };

    fetchData();
  });
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
