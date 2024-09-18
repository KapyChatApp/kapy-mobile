import { View, Text, SafeAreaViewBase } from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import TopBar from "@/components/navigator/TopBar";
import Search from "@/components/shared/function/Search";
import DetailRequestBox from "@/components/shared/friend/DetailRequestBox";
import DetailRequestList from "@/components/shared/friend/DetailRequestList";

const AllRequestPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SafeAreaProvider className="bg-white">
      <TopBar isOpen={isOpen} setIsOpen={setIsOpen}></TopBar>
      <Search></Search>
      <SafeAreaView>
        <DetailRequestList></DetailRequestList>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AllRequestPage;
