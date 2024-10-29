import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import FastRequestBox from "./FastRequestBox";
import { ScrollView } from "react-native-gesture-handler";
import { Link, useRouter } from "expo-router";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { RequestedProps } from "@/types/friend";

const FastRequestList = () => {
  const router = useRouter();
  const [myRequesteds, setMyRequested] = useState<RequestedProps[] | null>([]);
  useEffect(() => {
    const getMyRequested = async () => {
      const token = await AsyncStorage.getItem("token");
      console.log("Token retrieved: ", token);
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
          setMyRequested(response.data);
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    getMyRequested();
  }, []);
  return (
    <View className="request-list-container flex">
      <View className="request-header  mx-[18px] my-[10px]  flex flex-row items-center justify-between">
        <Text className=" font-helvetica-light text-14">Friend requests</Text>
        <Link href="/friends/all-request">
          <View className="flex flex-row items-center ">
            <Text className="font-helvetica-bold text-14 text-cardinal mr-[6px]">
              See all
            </Text>
            <Icon iconURL={IconURL.showall} size={28}></Icon>
          </View>
        </Link>
      </View>

      <ScrollView
        horizontal={true}
        className="request-list flex flex-row mx-[18px]"
        contentContainerStyle={{ columnGap: 4 }}
      >
        {myRequesteds?.map((item) => (
          <FastRequestBox {...item} />
        ))}
      </ScrollView>
    </View>
  );
};

export default FastRequestList;
