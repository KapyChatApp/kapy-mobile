import { View, Text, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import Previous from "@/components/ui/Previous";
import { ScrollView } from "react-native-gesture-handler";
import BestFriendBox from "@/components/shared/friend/BestFriendBox";
import Search from "@/components/shared/function/Search";
import { SafeAreaView } from "react-native-safe-area-context";
import { bgLight500Dark10 } from "@/styles/theme";
import { getMyBFFs } from "@/lib/my-bff";
import { FriendBoxProps } from "@/types/friend";
import { onRefresh } from "@/utils/Refresh";

const BFFListPage = () => {
  const navigation = useNavigation();
  const [myBFFs, setMyBFFs] = useState<FriendBoxProps[]>();
  const [refreshing, setRefreshing] = useState(false);
  const [q, setQ] = useState("");
  const getMyBFFFunc = async () => {
    const myBFFResponse = await getMyBFFs();
    setMyBFFs(myBFFResponse);
    setRefreshing(false);
  };
  useEffect(() => {
    getMyBFFFunc();
  }, []);
  const handleSearchBFF = (bffs: FriendBoxProps[], query: string) => {
    return bffs?.filter((bff) => 
      bff.firstName?.toLowerCase().includes(query.toLowerCase()) ||
      bff.lastName?.toLowerCase().includes(query.toLowerCase())
    );
  };
  return (
    <View className={`${bgLight500Dark10} flex-1`}>
      <Previous
        navigation={navigation}
        isAbsolute={true}
        header="Bestfriend list"
      ></Previous>
      <View className="mt-[60px] flex flex-1" style={{ rowGap: 4 }}>
        <Search onChangeText={setQ}></Search>
        <ScrollView className=" flex-1" contentContainerStyle={{ rowGap: 4 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>onRefresh(async()=>await getMyBFFFunc())}/>}>
          {q===""? myBFFs?.map((item:FriendBoxProps, index) => (
            <BestFriendBox key={index} {...item} />
          )): handleSearchBFF(myBFFs!,q).map((item:FriendBoxProps, index)=><BestFriendBox key={index} {...item}/>)}
        </ScrollView>
      </View>
    </View>
  );
};

export default BFFListPage;
