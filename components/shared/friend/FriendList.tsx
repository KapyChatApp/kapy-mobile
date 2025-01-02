import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { FriendBoxProps } from "@/types/friend";
import { textLight0Dark500 } from "@/styles/theme";
import { useFocusEffect } from "expo-router";
import FriendBox from "./FriendBox";
import { getMyFriends } from "@/lib/my-friends";
import Filter from "@/components/ui/Filter";
import {
  groupFriendsByFirstLetter,
  sortFriendsAscending,
  sortFriendsDescending,
} from "@/utils/Filter";
import { onRefresh } from "@/utils/Refresh";
import { getFromAsyncStorage } from "@/utils/Device";

const FriendList = ({refreshing, setRefreshing, setFriends}:any) => {
  const [myFriends, setMyFriends] = useState<FriendBoxProps[][]>([]);
  const getMyFriendsFUNC = async () => {
    const friends = await getMyFriends();
    setMyFriends(groupFriendsByFirstLetter(friends));
    setMyFriends(sortFriendsAscending(groupFriendsByFirstLetter(friends)));
    setFriends(friends);
    setRefreshing(false);
  };
  useFocusEffect(
    useCallback(() => {
      getMyFriendsFUNC();
    }, [])
  );

  const handleSortAsc = () => {
    const ascFriends = sortFriendsAscending(myFriends);
    setMyFriends(ascFriends);
  }
  
  const handleSortDesc = () => {
    const descFriends = sortFriendsDescending(myFriends);
    setMyFriends(descFriends);
  }

  const friendFilter = [
    {
      index: 0,
      label: "Ascending",
      filter: handleSortAsc,
    },
    {
      index: 1,
      label: "Descending",
      filter: handleSortDesc,
    }
  ];

  const handleRefresh = async ()=>{
    setRefreshing(true);
    const friends = await getMyFriends();
    setFriends(friends);
    setRefreshing(false);
  }

  return (
    <View className="flex flex-1">
      <View className="flex flex-row justify-between items-center px-[20px] py-[10px]">
        <Text className={`font-helvetica-light  ${textLight0Dark500}`}>
          My friends
        </Text>
        <Filter props={friendFilter} />
      </View>
      <ScrollView
        className="flex-1 px-[20px]"
        contentContainerStyle={{ rowGap: 4 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {myFriends.map((friendsGroup) => friendsGroup.map((item, index)=><View key={index} className="w-full flex" style={{rowGap:4}}>{index==0?<Text className={`${textLight0Dark500} font-helvetica-light text-12`}>{item.lastName?.split(" ").reverse()[0][0].toUpperCase()}</Text>:null}<FriendBox {...item}/></View>))}
      </ScrollView>
    </View>
  );
};

export default FriendList;
