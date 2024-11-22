import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Previous from "@/components/ui/Previous";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { bgLight500Dark10 } from "@/styles/theme";
import Rate from "@/components/shared/community/Rate";
import { RateProps } from "@/types/rate";
import { getRatesOfUser } from "@/lib/report";
import { useLocalSearchParams } from "expo-router/build/hooks";

const AllRatePage = () => {
    const{userId} = useLocalSearchParams();
  const navigation = useNavigation();
  const [rates, setRates] = useState<RateProps[]>();
  useEffect(()=>{
    const getAllRatesFUNC = async ()=>{
        const rates =  await getRatesOfUser(userId.toString());
        setRates(rates);
    }
    getAllRatesFUNC();
  },[]);
  return (
    <SafeAreaView className={`flex-1 ${bgLight500Dark10}`}>
      <View className="mt-[10px] ml-[10px]">
        <Previous navigation={navigation} />
      </View>
      <ScrollView className="p-[16px]" contentContainerStyle={{rowGap:8}}>
        {rates?.map((item)=><Rate key={item._id} {...item}/>)}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllRatePage;
