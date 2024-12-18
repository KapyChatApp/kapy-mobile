import { View, Text, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import Previous from "@/components/ui/Previous";
import { ScrollView } from "react-native-gesture-handler";
import BlockedUserBox from "@/components/shared/friend/BlockedUserBox";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "@/components/shared/function/Search";
import { bgLight500Dark10 } from "@/styles/theme";
import { FriendBoxProps } from "@/types/friend";
import { getMyBlocks } from "@/lib/my-blocks";

const BlockedListPage = () => {
  const navigation = useNavigation();
  const [blocks, setBlocks] = useState<FriendBoxProps[]>();
  const [refreshing, setRefreshing] = useState(false);
  const getMyBlocksFunc = async () => {
    const blockedListResponse = await getMyBlocks();
    setBlocks(blockedListResponse);
    setRefreshing(false);
  };
  useEffect(() => {
    getMyBlocksFunc();
  }, []);
  return (
    <View className={`${bgLight500Dark10} flex-1`}>
      <Previous
        navigation={navigation}
        isAbsolute={true}
        header="Blocked list"
      ></Previous>
      <View className="mt-[60px] flex flex-1" style={{ rowGap: 4 }}>
        <Search></Search>
        <ScrollView className="flex-1 " contentContainerStyle={{ rowGap: 4 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getMyBlocksFunc}/>}>
          {blocks?.map((item) => (
            <BlockedUserBox key={item._id} {...item} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default BlockedListPage;
