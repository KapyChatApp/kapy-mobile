import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SideBar from "@/components/navigator/SideBar";
import TopBar from "@/components/navigator/TopBar";
import MainHeader from "@/components/navigator/MainHeader";
import Search from "@/components/shared/function/Search";
import FastRequestBox from "@/components/shared/friend/FastRequestBox";
import { ScrollView } from "react-native-gesture-handler";

const friends = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SafeAreaView className="bg-white">
      <MainHeader></MainHeader>
      <Search></Search>
      <ScrollView horizontal={true} className="request-container flex flex-row mx-[18px]">
        <FastRequestBox type={true}></FastRequestBox>
        <FastRequestBox type={false}></FastRequestBox>
        <FastRequestBox type={false}></FastRequestBox>
        <FastRequestBox type={false}></FastRequestBox>
        <FastRequestBox type={true}></FastRequestBox>
        <FastRequestBox type={true}></FastRequestBox>
        <FastRequestBox type={true}></FastRequestBox>
      </ScrollView>
      <ScrollView className="friends-container"></ScrollView>
    </SafeAreaView>
  );
};

export default friends;
