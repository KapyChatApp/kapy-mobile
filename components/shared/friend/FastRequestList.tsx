import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import FastRequestBox from "./FastRequestBox";
import { ScrollView } from "react-native-gesture-handler";
import { Link, useFocusEffect, useRouter } from "expo-router";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { RequestedProps } from "@/types/friend";
import { getMyRequesteds } from "@/lib/my-requested";

const FastRequestList = () => {
  const router = useRouter();
  const [myRequesteds, setMyRequesteds] = useState<RequestedProps[] | null>([]);
  useFocusEffect(
    useCallback(() => {
      const getMyRequestedsFunc = async () => {
        const myRequestedResponse = await getMyRequesteds();
        console.log("my request");
        setMyRequesteds(myRequestedResponse);
      };
      getMyRequestedsFunc();
    }, [])
  );
  return (
    <View>
      {myRequesteds?.length === 0 ? null : (
        <View className="request-list-container flex">
          <View className="request-header  mx-[18px] mt-[10px]  flex flex-row items-center justify-between">
            <Text className=" font-helvetica-light text-14">
              Friend requests
            </Text>
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
      )}
    </View>
  );
};

export default FastRequestList;
