import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import Previous from "@/components/ui/Previous";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";

const ReportPage = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className={`${bgLight500Dark10} flex-1`}>
      <View className="mt-[10px] ml-[10px]">
        <Previous navigation={navigation} header="Report" />
      </View>
      <Text
        className={`text-cardinal font-helvetica-bold text-[24px] m-[20px]`}
      >
        Why you report it?
      </Text>
      <View className="px-[12px]">
        <TouchableOpacity className="flex px-[10px] border-y-[0.5px] border-border  py-[14px]">
          <Text className={`${textLight0Dark500} font-helvetica-light text-14`}>
            Copyright infringement or plagiarism.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex px-[10px] border-y-[0.5px] border-border  py-[14px]">
          <Text className={`${textLight0Dark500} font-helvetica-light text-14`}>
            Harassment or bullying.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex px-[10px] border-y-[0.5px] border-border  py-[14px]">
          <Text className={`${textLight0Dark500} font-helvetica-light text-14`}>
            Posting sensitive or private information.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex px-[10px] border-y-[0.5px] border-border  py-[14px]">
          <Text className={`${textLight0Dark500} font-helvetica-light text-14`}>
            Spamming or scam activities.
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ReportPage;
