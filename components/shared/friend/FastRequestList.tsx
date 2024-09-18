import { View, Text } from "react-native";
import React from "react";
import FastRequestBox from "./FastRequestBox";
import { ScrollView } from "react-native-gesture-handler";
import { Link } from "expo-router";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";

const FastRequestList = () => {
  return (
    <View className="request-list-container flex mb-[16px]">
      <View className="request-header  mx-[18px] my-[10px] flex flex-row items-center justify-between">
        <Text className=" font-helvetica-light text-14">Friend requests</Text>
        <Link href="/">
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
      >
        <FastRequestBox type={true}></FastRequestBox>
        <FastRequestBox type={false}></FastRequestBox>
        <FastRequestBox type={false}></FastRequestBox>
        <FastRequestBox type={false}></FastRequestBox>
        <FastRequestBox type={true}></FastRequestBox>
        <FastRequestBox type={true}></FastRequestBox>
        <FastRequestBox type={true}></FastRequestBox>
      </ScrollView>
    </View>
  );
};

export default FastRequestList;
