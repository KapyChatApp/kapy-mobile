import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import Previous from "@/components/ui/Previous";
import { useNavigation } from "expo-router";
import Search from "@/components/shared/function/Search";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import { FriendBoxProps } from "@/types/friend";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import FastRequestList from "@/components/shared/friend/FastRequestList";
import FriendList from "@/components/shared/friend/FriendList";
import FriendBox from "@/components/shared/friend/FriendBox";
import friends from ".";

const NewFriendPage = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const [friend, setFriend] = useState<FriendBoxProps|  undefined>();
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query) {
        const token = await AsyncStorage.getItem("token");
        axios
          .get(process.env.EXPO_PUBLIC_BASE_URL + "/user/find", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            params: { phonenumber: query },
          })
          .then((response) => {
            const friend: FriendBoxProps = response.data;
            setFriend(friend);
          })
          .catch((error) => {
            console.error("Error fetching friends:", error);
          });
      }
    }, 1500);
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <SafeAreaView className={`${bgLight500Dark10} flex-1`}>
      <View className="ml-[10px] mt-[10px]">
        <Previous navigation={navigation} header="New friend" />
      </View>
      <Search onChangeText={setQuery} />
      {query && friend?._id ? (
        <View className="flex-1 px-[20px] py-[12px] flex" style={{ rowGap: 4 }}>
          <FriendBox {...friend} />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default NewFriendPage;
