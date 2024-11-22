import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Previous from "@/components/ui/Previous";
import { useNavigation } from "expo-router";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import Rate from "@/components/shared/community/Rate";
import { RateProps } from "@/types/rate";
import { getRatesOfUser } from "@/lib/rate";
import { useLocalSearchParams } from "expo-router/build/hooks";
import CustomButton from "@/components/ui/CustomButton";
import { IconURL } from "@/constants/IconURL";
import RateForm from "@/components/shared/community/RateForm";

const AllFriendRatePage = () => {
  const { userId } = useLocalSearchParams();
  const navigation = useNavigation();
  const [rates, setRates] = useState<RateProps[]>();
  const [isRateFormOpen, setIsRateFormOpen] = useState(false);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const getAllRatesFUNC = async () => {
      const rates = await getRatesOfUser(userId.toString());
      setRates(rates);
    };
    getAllRatesFUNC();
  }, [reload]);
  return (
    <SafeAreaView className={` ${bgLight500Dark10} flex-1`}>
      <View className="mt-[10px] mx-[10px] flex flex-row justify-between items-center">
        <Previous navigation={navigation} isAbsolute={false} />
        <CustomButton
          width={100}
          height={40}
          label="Rate"
          onPress={() => setIsRateFormOpen(true)}
        />
      </View>
      {isRateFormOpen ? (
        <RateForm
          userId={userId.toString()}
          onClose={() => setIsRateFormOpen(false)}
          setReload={()=>setReload(true)}
        />
      ) : null}
      <ScrollView className="p-[16px]" contentContainerStyle={{ rowGap: 8 }}>
        {rates?.map((item) => (
          <Rate key={item._id} {...item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllFriendRatePage;
