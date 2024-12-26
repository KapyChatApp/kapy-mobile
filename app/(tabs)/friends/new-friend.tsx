import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import Previous from "@/components/ui/Previous";
import { useNavigation } from "expo-router";
import Search from "@/components/shared/function/Search";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import { FriendBoxProps } from "@/types/friend";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import FriendFindBox from "@/components/shared/friend/FriendFindBox";
import { findUserByPhoneNumber, getMySuggest } from "@/lib/add-friend";
import { ScrollView } from "react-native-gesture-handler";
import FriendBox from "@/components/shared/friend/FriendBox";

const NewFriendPage = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const [friend, setFriend] = useState<FriendBoxProps | undefined>();
  const [suggests, setSuggests] = useState<FriendBoxProps[]>([]);
  useEffect(() => {
    const getMySuggestFUNC = async () => {
      const suggests = await getMySuggest();
      setSuggests(suggests);
    };
    getMySuggestFUNC();
    const delayDebounceFn = setTimeout(async () => {
      if (query) {
        const result = await findUserByPhoneNumber(query);
        setFriend(result);
      }
    }, 1500);
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <View className={`${bgLight500Dark10} flex-1`}>
      <View className="ml-[10px] mt-[10px]">
        <Previous navigation={navigation} header="New friend" />
      </View>
      <Search onChangeText={setQuery} />
      {query !== "" && friend?._id ? (
        <View className="flex-1 px-[20px] py-[12px] flex" style={{ rowGap: 4 }}>
          <FriendFindBox {...friend} />
        </View>
      ) : (
        <View className="p-[10px]" style={{rowGap:10}}>
          <Text className={`${textLight0Dark500} font-helvetica-bold text-14`}>
            You may know them
          </Text>
          <ScrollView contentContainerStyle={{rowGap:4}}>
            {suggests.map((item, index) => (
              <FriendBox key={index} {...item} />
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default NewFriendPage;
