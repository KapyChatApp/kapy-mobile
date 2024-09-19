import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import Previous from "@/components/ui/Previous";
import { ScrollView } from "react-native-gesture-handler";
import BlockedUserBox from "@/components/shared/friend/BlockedUserBox";

const BlockedListPage = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Previous navigation={navigation}></Previous>
        <ScrollView className="mt-[80px] flex " contentContainerStyle={{rowGap:4}} >
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
  );
};

export default BlockedListPage;
