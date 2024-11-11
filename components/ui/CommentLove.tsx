import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "./Icon";
import { IconURL } from "@/constants/IconURL";
import { bgLight500Dark10 } from "@/styles/theme";

const CommentLove = ({ onPress, totalLike }: {onPress:()=>void, totalLike:number}) => {
  return (
    <View>
      <Text className="text-cardinal text-10 font-helvetica-bold m-[2px] ml-[16px]">
        {totalLike}
      </Text>
      <TouchableOpacity
        className={`flex flex-row items-center justify-center border border-cardinal w-[60px] h-[20px] rounded-lg ${bgLight500Dark10}`}
        style={{ columnGap: 6 }}
        onPress={onPress}
      >
        <Icon iconURL={IconURL.heart} size={10} />
        <Text className="text-cardinal font-helvetica-light text-10">Love</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommentLove;
