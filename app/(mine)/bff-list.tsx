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
  const getMyBFFFunc = async () => {
    const myBFFResponse = await getMyBFFs();
    setMyBFFs(myBFFResponse);
    setRefreshing(false);
  };
  useEffect(() => {
    getMyBFFFunc();
  }, []);
  return (
    <View className={`${bgLight500Dark10} flex-1`}>
      <Previous
        navigation={navigation}
        isAbsolute={true}
        header="Bestfriend list"
      ></Previous>
      <View className="mt-[60px] flex flex-1" style={{ rowGap: 4 }}>
        <Search></Search>
        <ScrollView className=" flex-1" contentContainerStyle={{ rowGap: 4 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>onRefresh(async()=>await getMyBFFFunc())}/>}>
          {myBFFs?.map((item: any) => (
            <BestFriendBox key={item._id} {...item} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default BFFListPage;
