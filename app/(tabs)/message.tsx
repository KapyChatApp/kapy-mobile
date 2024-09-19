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

const message = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SafeAreaView className="bg-white">
      <MainHeader></MainHeader>
      <Search></Search>
      <SafeAreaView>
        <ScrollView className="message-list bg-white w-full">
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
          <MessageBox></MessageBox>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default message;
