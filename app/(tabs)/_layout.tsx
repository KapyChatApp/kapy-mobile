import { View, Text, Image } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import { IconURL } from "@/constants/IconURL";
import TabIcon from "@/components/ui/TabIcon";
import TabBar from "@/components/shared/TabBar";

const HomeLayout = () => {
  return (
    <>
      <Tabs tabBar={(props)=> <TabBar {...props}></TabBar>}
        // screenOptions={{
        //   tabBarShowLabel: false,
        //   tabBarStyle: {
        //     backgroundColor: "#F57602",
        //     height: 70,
        //     alignItems: "center",
        //     justifyContent: "center",
        //   },
        //   tabBarActiveTintColor:"#CCCCCC"
        // }}
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
    </>
  );
};

export default HomeLayout;
