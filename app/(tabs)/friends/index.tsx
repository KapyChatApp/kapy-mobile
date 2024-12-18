import React, { useState, useEffect, useCallback } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import MainHeader from "@/components/navigator/Topbar/MainHeader";
import Search from "@/components/shared/function/Search";
import FastRequestList from "@/components/shared/friend/FastRequestList";
import FriendList from "@/components/shared/friend/FriendList";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import FriendBox from "@/components/shared/friend/FriendFindBox";
import { FriendBoxProps } from "@/types/friend";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FriendMainHeader from "@/components/navigator/Topbar/FriendMainHeader";
import { useFocusEffect } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
import { getMyFriends } from "@/lib/my-friends";
import { groupFriendsByFirstLetter } from "@/utils/Filter";
import { ScrollView } from "react-native-gesture-handler";

const FriendsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [friends, setFriends] = useState<FriendBoxProps[]>([]);
  const handleSearch = ()=>{
    const lowerCaseQuery = query.toLowerCase();

    return friends.filter((friend) => {
      const fullName = `${friend.firstName} ${friend.lastName}`.toLowerCase();
      const reverseFullName = `${friend.lastName} ${friend.firstName}`.toLowerCase();
  
      return (
        friend.firstName?.toLowerCase().includes(lowerCaseQuery) || 
        friend.lastName?.toLowerCase().includes(lowerCaseQuery) ||
        fullName.includes(lowerCaseQuery) || 
        reverseFullName.includes(lowerCaseQuery)
      );
    });
  }
  return (
    <View className={`${bgLight500Dark10} flex-1`}>
      <FriendMainHeader />
      <Search onChangeText={setQuery} />
      {query===""? <View className="flex-1">
        <FastRequestList />
        <FriendList refreshing={refreshing} setRefreshing={(status:boolean)=>setRefreshing(status)} setFriends={(friends:FriendBoxProps[])=>setFriends(friends)}/>
      </View>:<View className="flex-1 px-[20px] py-[10px]" style={{rowGap:10}}>
        <Text className={`${textLight0Dark500} font-helvetica-light text-12 `}>{handleSearch().length} {handleSearch().length>1? "results were found":"result was found"}</Text> 
        <ScrollView contentContainerStyle={{rowGap:4}}>{
        handleSearch().map((item,index)=><FriendBox key={index} {...item}/>)
      }
      </ScrollView></View>}
      
    </View>
  );
};

export default FriendsPage;
