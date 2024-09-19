import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link, useNavigation, useRouter } from "expo-router";

const SettingItem = ({index, label, link }: any) => {
    const router = useRouter();
  return (
    <TouchableOpacity onPress={()=>router.push(link)} className={`flex p-[18px] ${(index%2)? "bg-whitesmoke":""}`}>
      <Text className="text-14 font-helvetica-regular">{label}</Text>
    </TouchableOpacity>
  );
};

export default SettingItem;
