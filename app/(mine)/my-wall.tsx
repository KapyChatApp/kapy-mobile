import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import HeadProfile from "@/components/shared/community/HeadProfile";
import { ScrollView } from "react-native-gesture-handler";
import Previous from "@/components/ui/Previous";
import UserBio from "@/components/shared/community/UserBio";
import { bgLight500Dark10 } from "@/styles/theme";

const MyWallPage = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className={`flex-1 ${bgLight500Dark10}`}>
    <ScrollView>
      <HeadProfile />
      <Previous navigation={navigation} isAbsolute={true} />
      <UserBio />
      <View className="w-full h-[300px]"></View>
    </ScrollView>
  </SafeAreaView>
  );
};

export default MyWallPage;
