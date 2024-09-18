import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import DetailRequestBox from "./DetailRequestBox";
import { ScrollView } from "react-native-gesture-handler";

const DetailRequestList = () => {
  return (
    <View className="relative z-0">
      <ScrollView className="px-[20px] mt-[10px] pt-[10px] flex flex-col">
        <DetailRequestBox type={true}></DetailRequestBox>
        <DetailRequestBox type={true}></DetailRequestBox>
        <DetailRequestBox type={false}></DetailRequestBox>
        <DetailRequestBox type={true}></DetailRequestBox>
        <DetailRequestBox type={false}></DetailRequestBox>
        <DetailRequestBox type={true}></DetailRequestBox>
        <DetailRequestBox type={false}></DetailRequestBox>
        <DetailRequestBox type={true}></DetailRequestBox>
        <DetailRequestBox type={false}></DetailRequestBox>
        <DetailRequestBox type={false}></DetailRequestBox>
        <DetailRequestBox type={false}></DetailRequestBox>
        <DetailRequestBox type={false}></DetailRequestBox>
        <DetailRequestBox type={false}></DetailRequestBox>
      </ScrollView>
    </View>
  );
};

export default DetailRequestList;
