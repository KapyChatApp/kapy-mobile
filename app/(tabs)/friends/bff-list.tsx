import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import Previous from "@/components/ui/Previous";
import { ScrollView } from "react-native-gesture-handler";
import BestFriendBox from "@/components/shared/friend/BestFriendBox";
import Search from "@/components/shared/function/Search";
import { SafeAreaView } from "react-native-safe-area-context";
import { bgLight500Dark10 } from "@/styles/theme";

const BFFListPage = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className={`${bgLight500Dark10}`}>
      <Previous navigation={navigation} header="Bestfriend list"></Previous>
      <View className="mt-[40px] flex" style={{ rowGap: 4 }}>
        <Search></Search>
        <ScrollView className=" flex " contentContainerStyle={{ rowGap: 4 }}>
          <BestFriendBox></BestFriendBox>
          <BestFriendBox></BestFriendBox>
          <BestFriendBox></BestFriendBox>
          <BestFriendBox></BestFriendBox>
          <BestFriendBox></BestFriendBox>
          <BestFriendBox></BestFriendBox>
          <BestFriendBox></BestFriendBox>
          <BestFriendBox></BestFriendBox>
          <BestFriendBox></BestFriendBox>
          <BestFriendBox></BestFriendBox>
          <BestFriendBox></BestFriendBox>
          <BestFriendBox></BestFriendBox>
          <BestFriendBox></BestFriendBox>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default BFFListPage;
