import { View, Text, Image } from "react-native";
import React from "react";
import UserAvatar from "@/components/ui/UserAvatar";
import RequestButton from "@/components/ui/RequestButton";
import { IconURL } from "@/constants/IconURL";

const FastRequestBox = ({ type }: any) => {
  return (
    <View className="w-[209px] h-[97px] flex flex-row border border-border rounded-3xl items-center justify-center p-[13px]">
      <UserAvatar size={70}></UserAvatar>
      <View className="info-container flex ml-[16px]">
        <Text className="font-helvetica-bold text-14 ">Name</Text>
        <Text className="font-helvetica-light text-12 mb-[6px]">Message</Text>
        <RequestButton type={type} width={93} height={31}></RequestButton>
      </View>
      <Image
        className="w-[18px] h-[18px] absolute top-[13px] right-[13px]"
        source={type ? IconURL.bff_request : IconURL.f_request}
      ></Image>
    </View>
  );
};

export default FastRequestBox;
