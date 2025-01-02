import { View, Text, SafeAreaView, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import DetailRequestBox from "./DetailRequestBox";
import { ScrollView } from "react-native-gesture-handler";
import { RequestedProps } from "@/types/friend";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { onRefresh } from "@/utils/Refresh";

const DetailRequestList = () => {
  const [myRequesteds, setMyRequested] = useState<RequestedProps[] | null>([]);
  const [refreshing, setRefreshing] = useState(false);
  const getMyRequested = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await axios.get(
        process.env.EXPO_PUBLIC_BASE_URL + "/mine/requested",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      if (response.data) {
        const myRequested = response.data.filter((item:any)=>item.relation==="received_bff"|| item.relation==="received_friend");
        setMyRequested(myRequested);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
    setRefreshing(false);
  };
  useEffect(() => {
    getMyRequested();
  }, []);
  return (
    <ScrollView
      className="px-[20px] pt-[10px] flex flex-col flex-1"
      contentContainerStyle={{ rowGap: 4, paddingBottom: 4 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => onRefresh(async () => await getMyRequested())}
        />
      }
    >
      {myRequesteds?.map((item, key) => (
        <DetailRequestBox key={key} {...item} />
      ))}
    </ScrollView>
  );
};

export default DetailRequestList;
