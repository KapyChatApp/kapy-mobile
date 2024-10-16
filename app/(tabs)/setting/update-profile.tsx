import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderProfileEditor from "@/components/shared/setting/HeaderProfileEditor";
import BioEditor from "@/components/shared/setting/BioEditor";
import { ScrollView } from "react-native-gesture-handler";
import { bgLight500Dark10 } from "@/styles/theme";
import Previous from "@/components/ui/Previous";
import { useNavigation } from "expo-router";

const UpdateProfilePage = () => {
  return (
    <SafeAreaView className={`${bgLight500Dark10} flex-1`}>
      <ScrollView className="flex-1">
        <HeaderProfileEditor />
        <View className="space w-full h-[90px]"></View>
        <BioEditor />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateProfilePage;
