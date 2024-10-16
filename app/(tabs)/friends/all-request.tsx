import { View, Text, SafeAreaViewBase } from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import TopBar from "@/components/navigator/Topbar/TopBar";
import Search from "@/components/shared/function/Search";
import DetailRequestBox from "@/components/shared/friend/DetailRequestBox";
import DetailRequestList from "@/components/shared/friend/DetailRequestList";
import FriendFilter from "@/components/ui/FriendFilter";
import OutsidePressHandler, { EventProvider } from "react-native-outside-press";
import { setClose } from "@/utils/Toggle";
import { useNavigation } from "expo-router";
import Previous from "@/components/ui/Previous";
import TopBarWithoutSideBar from "@/components/navigator/Topbar/TopBarWithoutSideBar";
import { bgLight500Dark10 } from "@/styles/theme";

const AllRequestPage = () => {
  const navigation = useNavigation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  return (
    <SafeAreaView className={`${bgLight500Dark10} flex-1`}>
      <Previous navigation={navigation} isAbsolute={true}></Previous>
      <TopBarWithoutSideBar></TopBarWithoutSideBar>
      <Search></Search>
        <DetailRequestList></DetailRequestList>
      {/* <View className="flex absolute top-[130px] items-end justify-center w-screen">
        <FriendFilter
          isOpen={isFilterOpen}
          setIsOpen={setIsFilterOpen}
        ></FriendFilter>
      </View> */}
    </SafeAreaView>
  );
};

export default AllRequestPage;
