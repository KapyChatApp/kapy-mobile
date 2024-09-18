import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import DetailRequestBox from "./DetailRequestBox";
import { ScrollView } from "react-native-gesture-handler";

const DetailRequestList = () => {
  return (
      <ScrollView className="mx-[20px] flex flex-col z-0">
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
