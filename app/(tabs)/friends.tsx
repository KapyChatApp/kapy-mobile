import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SideBar from "@/components/navigator/SideBar";
import TopBar from "@/components/navigator/TopBar";
import MainHeader from "@/components/navigator/MainHeader";
import Search from "@/components/shared/function/Search";
import FastRequestBox from "@/components/shared/friend/FastRequestBox";
import { ScrollView } from "react-native-gesture-handler";
import FastRequestList from "@/components/shared/friend/FastRequestList";

const friends = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SafeAreaView className="bg-white">
      <MainHeader></MainHeader>
      <Search></Search>
      <FastRequestList></FastRequestList>
     
      <ScrollView className="friends-container"></ScrollView>
    </SafeAreaView>
  );
};

export default friends;
