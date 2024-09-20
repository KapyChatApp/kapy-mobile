import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SettingAccountProps, SettingAppProps } from "@/constants/SettingItem";
import SettingItem from "./SettingItem";
import SignOutButton from "@/components/ui/SignOutButton";

const SettingList = () => {
  return (
    <SafeAreaView>
      <ScrollView
        className="flex -mt-[36px] "
        contentContainerStyle={{ alignItems: "flex-end" }}
      >
        <View className="w-screen">
          <Text className="text-16 font-helvetica-bold text-cardinal m-[18px]">
            Account
          </Text>
          <View>
            {SettingAccountProps.map((item) => (
              <SettingItem
              key={item.index}
                index={item.index}
                label={item.label}
                link={item.link}
              ></SettingItem>
            ))}
          </View>
        </View>
        <View className="w-screen">
          <Text className="text-16 font-helvetica-bold text-cardinal m-[18px]">
            App
          </Text>
          <View>
            {SettingAppProps.map((item) => (
              <SettingItem
              key={item.index}
                index={item.index}
                label={item.label}
                link={item.link}
              ></SettingItem>
            ))}
          </View>
        </View>
        <SignOutButton></SignOutButton>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingList;
