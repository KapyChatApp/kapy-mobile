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

const FriendsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {
  }, []);

  return (
    <SafeAreaView className={`${bgLight500Dark10} flex-1`}>
      <FriendMainHeader />
      <Search onChangeText={setQuery} />
      <View className="flex-1">
        <FastRequestList />
        <FriendList />
      </View>
    </SafeAreaView>
  );
};

export default FriendsPage;
