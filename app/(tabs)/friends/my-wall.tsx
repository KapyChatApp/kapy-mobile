import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import HeadProfile from "@/components/shared/community/HeadProfile";
import { ScrollView } from "react-native-gesture-handler";
import Previous from "@/components/ui/Previous";
import UserBio from "@/components/shared/community/UserBio";

const MyWallPage = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="">
      <ScrollView
        className="w-screen h-screen flex "
        style={{ display: "flex", rowGap: 50 }}
      >
        <HeadProfile />
        <Previous navigation={navigation}></Previous>
        <UserBio></UserBio>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyWallPage;
