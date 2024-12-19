import { View, Text } from "react-native";
import React, { useState } from "react";
import {  useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import UserAvatar from "@/components/ui/UserAvatar";
import { bgLight510Dark20, textLight0Dark500 } from "@/styles/theme";
import { FriendBoxProps, SelectFriendBoxProps } from "@/types/friend";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
const SelectFriendBox = (props: SelectFriendBoxProps) => {
    const [isSelected, setIsSelected] = useState(false);
    const [pressTime, setPressTime] = useState(0);
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={
      ( (pressTime +1  ) % 2 !=0)? ()=>{setIsSelected(true); props.onSelect?.(props);

        setPressTime(pressTime+1);
      }:()=>{setIsSelected(false); props.onUnSelect?.(props); setPressTime(pressTime+1)}
      }
      className={`flex flex-row items-center p-[12px] px-[20px] w-full ${bgLight510Dark20}`}
    >
        <View className="flex flex-row items-center">   <UserAvatar avatarURL={{ uri: props.avatar }} size={40}></UserAvatar>
      <View className="flex ml-[9px] flex-1">
        <Text className={`font-helvetica-bold text-14 ${textLight0Dark500}`}>
          {props.firstName + " " + props.lastName}
        </Text>
      </View>
      <Icon iconURL={isSelected? IconURL.selected : IconURL.non_select} size={20}/>
      </View>
   
    </TouchableOpacity>
  );
};

export default SelectFriendBox;
