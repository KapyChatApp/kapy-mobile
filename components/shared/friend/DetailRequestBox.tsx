import { View, Text, Image } from "react-native";
import React from "react";
import UserAvatar from "@/components/ui/UserAvatar";
import RequestButton from "@/components/ui/RequestButton";
import DenyButton from "@/components/ui/DenyButton";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";

const DetailRequestBox = ({ type }: any) => {
  return (
    <View className="flex flex-row border border-border p-[14px] rounded-3xl items-center relative z-10 mt-[4px]">
      <View className="absolute -top-[14px] -left-[8px]">
        <Icon
          size={32}
          iconURL={type ? IconURL.bff_request : IconURL.f_request}
        ></Icon>
      </View>

      <UserAvatar size={57}></UserAvatar>
      <View className="ml-[9px]">
        <Text className="font-helvetica-bold text-14">Name</Text>
        <Text className="font-helvetica-light text-12">2 mutual friends</Text>
        <Text className="font-helvetica-light text-[10px] text-cardinal">
          Send request at 00:00
        </Text>
      </View>
      <View className="flex-1 flex items-center justify-center">
        <View className="flex flex-row items-center justify-center">
          <RequestButton type={type}></RequestButton>
          <View className="w-[4px] h-1"></View>
          <DenyButton label="Deny"></DenyButton>
        </View>
        {type ? (
          <Text className="font-helvetica-light text-10 mt-[6px]">
            Want to be your best friend
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default DetailRequestBox;
