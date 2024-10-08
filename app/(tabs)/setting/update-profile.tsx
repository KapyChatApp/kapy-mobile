import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderProfileEditor from "@/components/shared/setting/HeaderProfileEditor";
import BioEditor from "@/components/shared/setting/BioEditor";
import { ScrollView } from "react-native-gesture-handler";

const UpdateProfilePage = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <HeaderProfileEditor />
        <View className="space w-full h-[90px]"></View>
        <BioEditor />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateProfilePage;