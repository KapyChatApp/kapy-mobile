import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import Previous from "@/components/ui/Previous";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import { ReportContents } from "@/constants/UiItems";

const ReportPage = () => {
  const navigation = useNavigation();
  const [selectedContents, setSelectedContents] = useState<string[]>([]);

  return (
    <SafeAreaView className={`${bgLight500Dark10} flex-1`}>
      <View className="mt-[10px] ml-[10px]">
        <Previous navigation={navigation} header="Report" />
      </View>
      <Text
        className={`text-cardinal font-helvetica-bold text-[24px] m-[20px]`}
      >
        Why do you report it?
      </Text>
      {ReportContents.map((item, index) => (
        <TouchableOpacity
          onPress={() => { if(!selectedContents.includes(item)){setSelectedContents((prev) => [...prev, item])}else{
            setSelectedContents((prev)=>prev.filter((i)=>i!==item));
          }}}
          key={index}
          className={`flex px-[10px] border-t-[0.5px] border-border  py-[14px] ${
            index === ReportContents.length - 1 ? "border-y-[0.5px]" : ""
          } ${
            selectedContents.includes(item)
              ? "bg-light-340 dark:bg-dark-20"
              : ""
          }`}
        >
          <Text className={`${textLight0Dark500} font-helvetica-light text-14`}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

export default ReportPage;
