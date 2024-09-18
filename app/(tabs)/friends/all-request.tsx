import { View, Text, SafeAreaViewBase } from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import TopBar from "@/components/navigator/TopBar";
import Search from "@/components/shared/function/Search";
import DetailRequestBox from "@/components/shared/friend/DetailRequestBox";
import DetailRequestList from "@/components/shared/friend/DetailRequestList";
import FriendFilter from "@/components/ui/FriendFilter";
import OutsidePressHandler from "react-native-outside-press";

const AllRequestPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  return (
    <SafeAreaView className="bg-white">
      <TopBar isOpen={isOpen} setIsOpen={setIsOpen}></TopBar>
      <Search></Search>
      <SafeAreaView className="mt-[10px]">
        <DetailRequestList></DetailRequestList>
      </SafeAreaView>
      <View className="flex absolute top-[130px] items-end justify-center w-screen">
        <FriendFilter
          isOpen={isFilterOpen}
          setIsOpen={setIsFilterOpen}
        ></FriendFilter>
      </View>
    </SafeAreaView>
  );
};

export default AllRequestPage;
