import { View, Text } from "react-native";
import React from "react";
import UserAvatar from "@/components/ui/UserAvatar";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";

const HeaderProfileEditor = () => {
  return (
    <View className="flex items-center justify-center relative">
      <View>
        <View className="w-[430px] h-[200px] bg-deny "></View>
        <TouchableOpacity className="absolute right-[10px] -top-[40px]">
          <Icon iconURL={IconURL.change_image} size={35} />
        </TouchableOpacity>
      </View>
      <View className=" flex items-center justify-center absolute top-[90px]">
        <View>
          <UserAvatar size={176}></UserAvatar>
          <TouchableOpacity className="absolute right-0 -top-[48px]">
            <Icon iconURL={IconURL.change_image} size={35} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HeaderProfileEditor;
