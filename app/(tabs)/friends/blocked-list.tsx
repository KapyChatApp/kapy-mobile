import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import Previous from "@/components/ui/Previous";
import { ScrollView } from "react-native-gesture-handler";
import BlockedUserBox from "@/components/shared/friend/BlockedUserBox";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "@/components/shared/function/Search";
import { bgLight500Dark10 } from "@/styles/theme";

const BlockedListPage = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className={`${bgLight500Dark10}`}>
      <Previous navigation={navigation} isAbsolute={true} header="Blocked list"></Previous>
      <View className="mt-[40px] flex" style={{ rowGap: 4 }}>
        <Search></Search>
        <ScrollView className="flex " contentContainerStyle={{ rowGap: 4 }}>
          <BlockedUserBox></BlockedUserBox>
          <BlockedUserBox></BlockedUserBox>
          <BlockedUserBox></BlockedUserBox>
          <BlockedUserBox></BlockedUserBox>
          <BlockedUserBox></BlockedUserBox>
          <BlockedUserBox></BlockedUserBox>
          <BlockedUserBox></BlockedUserBox>
          <BlockedUserBox></BlockedUserBox>
          <BlockedUserBox></BlockedUserBox>
          <BlockedUserBox></BlockedUserBox>
          <BlockedUserBox></BlockedUserBox>
          <BlockedUserBox></BlockedUserBox>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default BlockedListPage;
