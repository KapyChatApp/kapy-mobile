import { View, Text } from "react-native";
import React from "react";
import FriendAlphabetList from "./FriendAlphabetList";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const FriendList = () => {
  return (
    <View className="flex">
      <Text className="font-helvetica-light mx-[20px] my-[12px]">My friends</Text>
        <ScrollView>
          <FriendAlphabetList letter="A"></FriendAlphabetList>
          <FriendAlphabetList letter="B"></FriendAlphabetList>
          <FriendAlphabetList letter="C"></FriendAlphabetList>
          <FriendAlphabetList letter="D"></FriendAlphabetList>
          <FriendAlphabetList letter="E"></FriendAlphabetList>
        </ScrollView>
    </View>
  );
};

export default FriendList;
