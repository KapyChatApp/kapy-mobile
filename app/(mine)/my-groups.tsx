import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Previous from "@/components/ui/Previous";
import { useNavigation } from "expo-router";
import { SearchBar } from "react-native-screens";
import Search from "@/components/shared/function/Search";
import { ScrollView } from "react-native-gesture-handler";
import { bgLight500Dark10 } from "@/styles/theme";
import GroupList from "@/components/shared/group/GroupList";

const MyGroupsPage = () => {
  const navigation = useNavigation();
  return (
    <View className={`${bgLight500Dark10} flex-1`}>
      <View className="ml-[10px] mt-[10px]">
        <Previous navigation={navigation} header="My groups" />
      </View>
      <Search />
        <GroupList />
    </View>
  );
};

export default MyGroupsPage;
