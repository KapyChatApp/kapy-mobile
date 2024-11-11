import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "./Icon";
import { IconURL } from "@/constants/IconURL";
import { bgLight500Dark10 } from "@/styles/theme";

const Comment = ({ onPress,totalComment }: {onPress:any, totalComment:number}) => {
  return (
    <View>
      <Text className="text-cardinal text-12 font-helvetica-bold m-[2px] ml-[16px]">
        {totalComment}
      </Text>
      <TouchableOpacity
        className={`flex flex-row items-center justify-center border border-cardinal w-[93px] h-[27px] rounded-lg ${bgLight500Dark10}`}
        style={{ columnGap: 6 }}
        onPress={onPress}
      >
        <Icon iconURL={IconURL.comment} size={16} />
        <Text className="text-cardinal font-helvetica-light text-12">
          Comment
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Comment;
