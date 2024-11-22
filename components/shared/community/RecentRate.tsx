import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import Rate from "./Rate";
import { textLight0Dark500 } from "@/styles/theme";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
import { Link, useFocusEffect, useRouter } from "expo-router";
import { RateProps } from "@/types/rate";
import { getRatesOfUser } from "@/lib/rate";

const RecentRate = ({
  path,
  recentRates,
  userId,
}: {
  path: any;
  recentRates: RateProps[];
  userId: string;
}) => {
  const router = useRouter();
  return (
    <View className="flex" style={{ rowGap: 14 }}>
      <View className="flex-row justify-between items-center">
        <Text className={`${textLight0Dark500} text-14 font-helvetica-bold`}>
          Recent rates
        </Text>
        <TouchableOpacity
          onPress={() =>
            router.push({ pathname: path, params: { userId: userId } })
          }
        >
          <View className="flex flex-row items-center ">
            <Text className="font-helvetica-bold text-14 text-cardinal mr-[6px]">
              See all
            </Text>
            <Icon iconURL={IconURL.showall} size={28}></Icon>
          </View>
        </TouchableOpacity>
      </View>

      <View className="flex px-[8px]" style={{ rowGap: 10 }}>
        {recentRates.map((item) => (
          <Rate key={item._id} {...item} />
        ))}
      </View>
    </View>
  );
};

export default RecentRate;
