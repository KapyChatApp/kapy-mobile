import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "../../ui/Icon";
import { IconURL } from "@/constants/IconURL";
import { Href, useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import { useRouter } from "expo-router";
const SidebarItems = ({ label, iconURL, link }: any) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      className="flex flex-row items-center justify-start pl-[40px] py-[16px]"
      onPress={() => router.push({ pathname: link })}
    >
      <Icon size={28} iconURL={iconURL}></Icon>
      <Text className="font-helvetica-bold text-14 ml-[16px]">{label}</Text>
    </TouchableOpacity>
  );
};

export default SidebarItems;
