import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import Previous from "@/components/ui/Previous";
import { useNavigation } from "expo-router";
import SecurityList from "@/components/shared/setting/SecurityList";

const index = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Previous navigation={navigation} header="Security" />
      <SecurityList />
    </SafeAreaView>
  );
};

export default index;
