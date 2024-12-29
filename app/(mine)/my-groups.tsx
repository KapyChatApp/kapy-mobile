import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Previous from "@/components/ui/Previous";
import { useNavigation } from "expo-router";
import { SearchBar } from "react-native-screens";
import Search from "@/components/shared/function/Search";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { bgLight500Dark10 } from "@/styles/theme";
import GroupList from "@/components/shared/group/GroupList";
import { MessageBoxProps } from "@/types/message";
import { getMyGroups } from "@/lib/message";
import MessageBox from "@/components/shared/message/MessageBox";
import { getFromAsyncStorage } from "@/utils/Device";

const MyGroupsPage = () => {
  const navigation = useNavigation();
  const [groups, setGroups] = useState<MessageBoxProps[]>([]);
  const [q, setQ] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const handleSearchGroups = () => {
    const lowerCaseQuery = q.toLowerCase();
    return (
      groups.filter((group) => {
        return group.groupName?.toLowerCase().includes(lowerCaseQuery);
      }) || []
    );
  };

  const handleRefresh = async ()=>{
    setRefreshing(true);
    const groups = await getMyGroups();
    setGroups(Array.isArray(groups) ? groups : []);
    setRefreshing(false);
  }
  useEffect(() => {
    const getMyGroupsFUNC = async () => {
      const groups = await  getFromAsyncStorage("groups");
      setGroups(Array.isArray(groups) ? groups : []);
    };
    getMyGroupsFUNC();
  }, []);
  return (
    <View className={`${bgLight500Dark10} flex-1`}>
      <View className="ml-[10px] mt-[10px]">
        <Previous navigation={navigation} header="My groups" />
      </View>
      <Search onChangeText={setQ} />
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>}>
        {q === "" && groups !==undefined
          ? groups.map((item, index) => <MessageBox key={index} {...item} />)
          : handleSearchGroups().map((item, index) => (
              <MessageBox key={index} {...item} />
            ))}
      </ScrollView>
    </View>
  );
};

export default MyGroupsPage;
