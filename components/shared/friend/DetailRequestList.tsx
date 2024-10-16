import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import DetailRequestBox from "./DetailRequestBox";
import { ScrollView } from "react-native-gesture-handler";

const DetailRequestList = () => {
  return (
      <ScrollView className="px-[20px] pt-[10px] flex flex-col flex-1" contentContainerStyle={{rowGap:4, paddingBottom:4}}>
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
  );
};

export default DetailRequestList;
