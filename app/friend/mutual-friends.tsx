import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Previous from "@/components/ui/Previous";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ShortUserProps } from "@/types/user";
import { FriendBoxProps } from "@/types/friend";
import { bgLight500Dark10 } from "@/styles/theme";
import { getMutualFriends } from "@/lib/friend-profile";
import FriendBox from "@/components/shared/friend/FriendBox";

const MutualFriendsPage = () => {
  const { friendId } = useLocalSearchParams();
  const navigation = useNavigation();
  const [mutualFriends, setMutualFriends] = useState<ShortUserProps[]>([]);
  useEffect(() => {
    const getMutualFriendFUNC = async () => {
      const mutualFriends = await getMutualFriends(friendId.toString());
      setMutualFriends(mutualFriends);
    };
    getMutualFriendFUNC();
  }, []);
  return (
    <View className={`${bgLight500Dark10} flex-1`} style={{rowGap:10}}>
      <View className="mt-[10px] ml-[10px]">
        <Previous navigation={navigation} header="Mutual friends" />
      </View>
      <ScrollView contentContainerStyle={{rowGap:4, padding:10}}>
        {mutualFriends.map((item, index)=><FriendBox key={index} {...item}/>)}
      </ScrollView>
    </View>
  );
};

export default MutualFriendsPage;
