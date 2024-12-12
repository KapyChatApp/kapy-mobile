import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Previous from "@/components/ui/Previous";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import { ReportContents } from "@/constants/UiItems";
import CustomButton from "@/components/ui/CustomButton";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { createReport } from "@/lib/report";

const ReportPage = () => {
  const { targetId, targetType } = useLocalSearchParams();
  const navigation = useNavigation();
  const [selectedContents, setSelectedContents] = useState<string[]>([]);
  const [isLoad, setIsLoad] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView className={`${bgLight500Dark10} flex-1`}>
        <ScrollView
          contentContainerStyle={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <View className=" ml-[10px] w-full">
            <Previous navigation={navigation} header="Report" />
          </View>
          <Text
            className={`text-cardinal font-helvetica-bold text-[24px] m-[20px] w-full`}
          >
            Why do you report it?
          </Text>
          <View className="w-full">
            {ReportContents.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  if (!selectedContents.includes(item)) {
                    setSelectedContents((prev) => [...prev, item]);
                  } else {
                    setSelectedContents((prev) =>
                      prev.filter((i) => i !== item)
                    );
                  }
                }}
                key={index}
                className={`flex px-[10px] border-t-[0.5px] border-border  py-[14px] ${
                  index === ReportContents.length - 1 ? "border-y-[0.5px]" : ""
                } ${
                  selectedContents.includes(item)
                    ? "bg-light-340 dark:bg-dark-20"
                    : ""
                }`}
              >
                <Text
                  className={`${textLight0Dark500} font-helvetica-light text-14`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View className="p-[10px] flex w-full" style={{ rowGap: 10 }}>
            <View
              className="flex flex-row flex-wrap"
              style={{ rowGap: 6, columnGap: 6 }}
            >
              {selectedContents.map((item, index) => (
                <View
                  key={index}
                  className="bg-light-340 dark:bg-dark-20 py-[10px] px-[20px] rounded-full flex flex-row items-center "
                  style={{ columnGap: 8 }}
                >
                  <Text
                    className={`text-cardinal font-helvetica-light text-12`}
                  >
                    {item}
                  </Text>
                  <TouchableOpacity
                    className="flex-1"
                    onPress={() =>
                      setSelectedContents((prev) =>
                        prev.filter((i) => i !== item)
                      )
                    }
                  >
                    <Icon iconURL={IconURL.close} size={16} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <Text className="text-cardinal font-helvetica-bold text-16">
              Others
            </Text>
            <TextInput
              numberOfLines={10}
              className={`border border-border w-full h-[160px] rounded-3xl ${textLight0Dark500} p-[16px] font-helvetica-light`}
              placeholder="Type..."
              textAlignVertical="top"
              verticalAlign="top"
              multiline={true}
              placeholderTextColor="#4C4C4C"
            />
          </View>
          <CustomButton
            label="Submit"
            width={100}
            height={46}
            fontSize={14}
            onPress={async () =>
              await createReport(
                selectedContents.join(", "),
                targetId.toString(),
                targetType.toString(),
                ()=>setIsLoad(true),
                ()=>setIsLoad(false),
                ()=>setIsloading(true),
                ()=>setIsloading(false),
                ()=>navigation.goBack()
              )
            }
          />
        </ScrollView>
        {isLoad ? <LoadingSpinner loading={isLoading} /> : null}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ReportPage;
