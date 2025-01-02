import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Previous from "@/components/ui/Previous";
import { useNavigation, useRouter } from "expo-router";
import Search from "@/components/shared/function/Search";
import { ScrollView } from "react-native-gesture-handler";
import { bgLight500Dark10 } from "@/styles/theme";
import { FriendBoxProps } from "@/types/friend";
import { findMyFriend } from "@/lib/find-request";
import FriendBoxNonEvent from "@/components/shared/friend/FriendBoxNonEvent";
import { createGroup, getAMessageBox } from "@/lib/message";
import { getLocalAuth } from "@/lib/local";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFromAsyncStorage } from "@/utils/Device";

const SearchPage = () => {
  const navigation = useNavigation();
  const [q, setQ] = useState("");
  const [friends, setFriends] = useState<FriendBoxProps[]>([]);
  const [localUserId, setLocalUserId] = useState("");
  const router = useRouter();
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friends = await getFromAsyncStorage("friends");
        setFriends(friends);
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
    getFriends();
  }, []);

  const handleSearch = ()=>{
    const lowerCaseQuery = q.toLowerCase();

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
    <View className={`flex-1 flex ${bgLight500Dark10}`} style={{ rowGap: 8 }}>
      <View className="mt-[10px] ml-[10px]">
        <Previous navigation={navigation} header="Search friends" />
      </View>
      <Search onChangeText={setQ} />
      <ScrollView
        className="flex-1 px-[20px]"
        contentContainerStyle={{ rowGap: 4 }}
      >
        {q===""? friends.map((item, index) => (
          <TouchableOpacity key={index}
            onPress={async () => {
              const newBox = await createGroup([item._id]);
                router.push({
                  pathname: "/chatbox/[messageId]",
                  params: { messageId: newBox._id },
                });
             
          
            }}
          >
            <FriendBoxNonEvent key={item._id} {...item} />
          </TouchableOpacity>
        )) : handleSearch().map((item, index)=><TouchableOpacity key={index}
            onPress={async () => {
              const newBox = await createGroup([item._id]);
          
              if (newBox.success) {
          
                router.push({
                  pathname: "/chatbox/[messageId]",
                  params: { messageId: newBox._id },
                });
              } else {
                console.log("existt: ",newBox._id)
                 router.push({
                  pathname: "/chatbox/[messageId]",
                  params: { messageId: newBox._id },
                });
              }
          
            }}
          >
            <FriendBoxNonEvent key={item._id} {...item} />
          </TouchableOpacity>)}
      </ScrollView>
    </View>
  );
};

export default SearchPage;
