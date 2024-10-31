import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import FriendAlphabetList from "./FriendAlphabetList";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { FriendBoxProps } from "@/types/friend";
import FriendBox from "./FriendBox";
import { textLight0Dark500 } from "@/styles/theme";
import { useFocusEffect } from "expo-router";

const FriendList = () => {
  const [myFriends, setMyFriends] = useState<FriendBoxProps[]>([]);
  useFocusEffect(
    useCallback(()=>{
      const getMyFriends = async ()=>{
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(process.env.EXPO_PUBLIC_BASE_URL + "/mine/friends",{
          headers:{
            "Content-Type": "application/json",
            "Authorization": `${token}`
          }
        });
        if(response.data){
          setMyFriends(response.data);
        }
        console.log("failed");
      }
      getMyFriends();
    },[])
);
  return (
    <View className="flex flex-1">
      <Text className={`font-helvetica-light mx-[20px] my-[12px] ${textLight0Dark500}`}>My friends</Text>
        <ScrollView className="flex-1 px-[20px]" contentContainerStyle={{rowGap:4}}>
          {myFriends.map((item,index)=><FriendBox key={item._id} {...item}/>)}
          {/* <FriendAlphabetList letter="A"></FriendAlphabetList>
          <FriendAlphabetList letter="B"></FriendAlphabetList>
          <FriendAlphabetList letter="C"></FriendAlphabetList>
          <FriendAlphabetList letter="D"></FriendAlphabetList>
          <FriendAlphabetList letter="E"></FriendAlphabetList> */}
        </ScrollView>
    </View>
  );
};

export default FriendList;
