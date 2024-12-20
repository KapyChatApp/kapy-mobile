import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import Previous from "@/components/ui/Previous";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { bgLight500Dark10 } from "@/styles/theme";
import Rate from "@/components/shared/community/Rate";
import { RateProps } from "@/types/rate";
import { getRatesOfUser } from "@/lib/rate";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { onRefresh } from "@/utils/Refresh";

const AllRatePage = () => {
  const { userId } = useLocalSearchParams();
  const navigation = useNavigation();
  const [rates, setRates] = useState<RateProps[]>();
  const [refreshing, setRefreshing] = useState(false);
  const getAllRatesFUNC = async () => {
    const rates = await getRatesOfUser(userId.toString());
    setRates(rates);
    setRefreshing(false);
  };
  useEffect(() => {
    getAllRatesFUNC();
  }, []);
  return (
    <View className={`flex-1 ${bgLight500Dark10}`}>
      <View className="mt-[10px] ml-[10px]">
        <Previous navigation={navigation} />
      </View>
      <ScrollView className="p-[16px]" contentContainerStyle={{ rowGap: 8 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>onRefresh(async()=>await getAllRatesFUNC())}/>}>
        {rates?.map((item) => (
          <Rate key={item._id} {...item} />
        ))}
      </ScrollView>
    </View>
  );
};

export default AllRatePage;
