import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import InviteALphabetList from "./InviteALphabetList";

const InviteList = () => {
  return (
    <SafeAreaView>
      <View className="flex">
        <ScrollView>
            <InviteALphabetList letter="A"/>
            <InviteALphabetList letter="B"/>
            <InviteALphabetList letter="C"/>
            <InviteALphabetList letter="D"/>
            <InviteALphabetList letter="E"/>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default InviteList;
