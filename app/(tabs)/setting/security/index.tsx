import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import Previous from "@/components/ui/Previous";
import { useNavigation } from "expo-router";
import SecurityList from "@/components/shared/setting/SecurityList";
import { bgLight500Dark10 } from "@/styles/theme";

const index = () => {
  const navigation = useNavigation();
  return (
    <View className={`${bgLight500Dark10} w-full h-full`}>
      <Previous navigation={navigation} header="Security" />
      <SecurityList />
    </View>
  );
};

export default index;
