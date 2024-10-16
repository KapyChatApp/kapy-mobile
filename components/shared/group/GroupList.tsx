import { View, Text, ScrollView } from "react-native";
import React from "react";
import FriendAlphabetList from "../friend/FriendAlphabetList";
import GroupAlphabetList from "./GroupAlphabetList";
import { SafeAreaView } from "react-native-safe-area-context";

const GroupList = () => {
  return (
    <SafeAreaView>
    <View className="flex">
      <ScrollView>
        <GroupAlphabetList letter="A" />
        <GroupAlphabetList letter="B" />
        <GroupAlphabetList letter="C" />
        <GroupAlphabetList letter="D" />
        <GroupAlphabetList letter="E" />
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

export default GroupList;
