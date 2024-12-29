import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { bgLight500Dark10 } from "@/styles/theme";
import { useNavigation } from "expo-router";
import Previous from "@/components/ui/Previous";
import { AuthHistoryProps } from "@/types/security";
import { getMyAuthHistory } from "@/lib/security";
import { ScrollView } from "react-native-gesture-handler";
import AuthHistoryBox from "@/components/shared/security/AuthHistoryBox";

const SignInPage = () => {
  const navigation = useNavigation();
  const [histories, setHistories] = useState<AuthHistoryProps[]>([]);
  useEffect(() => {
    const getHistories = async () => {
      const histories = await getMyAuthHistory();
      setHistories(histories);
    };
    getHistories();
  }, []);
  return (
    <View className={`flex-1 ${bgLight500Dark10}`}>
      <View className="mt-[20px] ml-[20px]">
        <Previous navigation={navigation} header="Login history" />
      </View>
      <ScrollView contentContainerStyle={{rowGap:8}} className="p-[20px]">
        {histories
          ? histories.map((item, index) => (
              <AuthHistoryBox key={index} {...item} />
            ))
          : null}
      </ScrollView>
    </View>
  );
};

export default SignInPage;
