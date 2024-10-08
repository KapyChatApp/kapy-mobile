import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Previous from "@/components/ui/Previous";
import TopBar from "@/components/navigator/Topbar/TopBar";
import SettingHeader from "@/components/shared/setting/SettingHeader";
import { ScrollView } from "react-native-gesture-handler";
import SettingItem from "@/components/shared/setting/SettingItem";
import SettingList from "@/components/shared/setting/SettingList";
const SettingPage = () => {
  return (
    <SafeAreaView className="bg-light-500 dark:bg-dark-10">
      <SettingHeader />
      <SafeAreaView>
        <SettingList />
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default SettingPage;
