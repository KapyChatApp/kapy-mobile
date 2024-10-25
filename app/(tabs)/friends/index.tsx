import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SideBar from "@/components/navigator/Sidebar/SideBar";
import TopBar from "@/components/navigator/Topbar/TopBar";
import MainHeader from "@/components/navigator/Topbar/MainHeader";
import Search from "@/components/shared/function/Search";
import FastRequestBox from "@/components/shared/friend/FastRequestBox";
import { ScrollView } from "react-native-gesture-handler";
import FastRequestList from "@/components/shared/friend/FastRequestList";
import FriendList from "@/components/shared/friend/FriendList";
import OutsidePressHandler, { EventProvider } from "react-native-outside-press";
import { bgLight500Dark0, bgLight500Dark10 } from "@/styles/theme";

const FriendsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SafeAreaView className={`${bgLight500Dark10} flex-1`}>
      <MainHeader></MainHeader>
      <Search></Search>
      <FastRequestList></FastRequestList>
      <FriendList></FriendList>
    </SafeAreaView>
  );
};

export default FriendsPage;
