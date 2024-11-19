import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Previous from "@/components/ui/Previous";
import { useNavigation } from "expo-router";
import Search from "@/components/shared/function/Search";
import { ScrollView } from "react-native-gesture-handler";
import { bgLight500Dark10 } from "@/styles/theme";
import { FriendBoxProps } from "@/types/friend";
import { findMyFriend } from "@/requests/find-request";
import FriendBox from "@/components/shared/friend/FriendBox";

const SearchPage = () => {
  const navigation = useNavigation();
  const [q, setQ] = useState("");
  const [results, setResults] = useState<FriendBoxProps[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
        if(q!=""){
      const results = await findMyFriend(q);
      setResults(results);
        }
    }, 1500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [q]);
  return (
    <SafeAreaView
      className={`flex-1 flex ${bgLight500Dark10}`}
      style={{ rowGap: 8 }}
    >
      <View className="mt-[10px] ml-[10px]">
        <Previous navigation={navigation} header="Search friends" />
      </View>
      <Search onChangeText={setQ} />
      <ScrollView className="flex-1 px-[8px]" contentContainerStyle={{rowGap:4}}>
        {results.map((item)=><FriendBox key={item._id} {...item}/>)}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchPage;
