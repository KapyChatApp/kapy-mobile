import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import MyHeadProfile from "@/components/shared/community/MyHeadProfile";
import { ScrollView } from "react-native-gesture-handler";
import Previous from "@/components/ui/Previous";

const MyWallPage = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="h-screen w-screen">
      <ScrollView className="w-screen h-screen">
        <MyHeadProfile />
        <Previous navigation={navigation}></Previous>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyWallPage;
