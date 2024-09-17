import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SideBar from "@/components/navigator/SideBar";
import TopBar from "@/components/navigator/TopBar";
import MainHeader from "@/components/navigator/MainHeader";
import Search from "@/components/shared/function/Search";

const friends = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SafeAreaView className="bg-white">
      <MainHeader></MainHeader>
      <Search></Search>
    </SafeAreaView>
  );
};

export default friends;
