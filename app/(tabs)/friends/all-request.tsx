import { View, Text, SafeAreaViewBase } from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import TopBar from "@/components/navigator/TopBar";
import Search from "@/components/shared/function/Search";
import DetailRequestBox from "@/components/shared/friend/DetailRequestBox";
import DetailRequestList from "@/components/shared/friend/DetailRequestList";
import FriendFilter from "@/components/ui/FriendFilter";
import OutsidePressHandler, { EventProvider } from "react-native-outside-press";
import { setClose } from "@/utils/Toggle";
import { useNavigation } from "expo-router";
import Previous from "@/components/ui/Previous";
import TopBarWithoutSideBar from "@/components/navigator/TopBarWithoutSideBar";

const AllRequestPage = () => {
  const navigation = useNavigation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  return (
    <OutsidePressHandler
      onOutsidePress={() => setClose(isFilterOpen, setIsFilterOpen)}
    >
      <SafeAreaView className="bg-white">
      <Previous navigation={navigation}></Previous>
        <TopBarWithoutSideBar></TopBarWithoutSideBar>
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
    </OutsidePressHandler>
  );
};

export default AllRequestPage;
