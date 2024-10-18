import { View, Text } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "@/components/navigator/Topbar/TopBar";
import SideBar from "@/components/navigator/Sidebar/SideBar";
import MainHeader from "@/components/navigator/Topbar/MainHeader";
import { SearchBar } from "react-native-screens";
import Search from "@/components/shared/function/Search";
import MessageBox from "@/components/shared/message/MessageBox";
import { ScrollView } from "react-native-gesture-handler";
import { bgLight500Dark10 } from "@/styles/theme";
import SideMenu from "@rexovolt/react-native-side-menu";

const OutSideMessagePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SafeAreaView className={`${bgLight500Dark10} flex-1 `}>
        <MainHeader></MainHeader>
        <Search></Search>
        <ScrollView className="message-list w-full flex-1">
          <MessageBox></MessageBox>
          <MessageBox></MessageBox>
          <MessageBox></MessageBox>
          <MessageBox></MessageBox>
          <MessageBox></MessageBox>
          <MessageBox></MessageBox>
          <MessageBox></MessageBox>
          <MessageBox></MessageBox>
          <MessageBox></MessageBox>
          <MessageBox></MessageBox>
          <MessageBox></MessageBox>
          <MessageBox></MessageBox>
          <MessageBox></MessageBox>
          <MessageBox></MessageBox>
          <MessageBox></MessageBox>
          <MessageBox></MessageBox>
          <MessageBox></MessageBox>
          <MessageBox></MessageBox>
        </ScrollView>
    </SafeAreaView>
  );
};

export default OutSideMessagePage;
