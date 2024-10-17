import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "./Icon";
import { IconURL } from "@/constants/IconURL";
import { bgLight500Dark10 } from "@/styles/theme";

const Share = ({ onPress }: any) => {
  return (
    <View>
        <Text className="text-cardinal text-12 font-helvetica-bold m-[2px] ml-[16px]">21</Text>
      <TouchableOpacity
        className={`flex flex-row items-center justify-center border border-cardinal w-[82px] h-[27px] rounded-lg ${bgLight500Dark10}`}
        style={{ columnGap: 6 }}
        onPress={onPress}
      >
        <Icon iconURL={IconURL.share} size={16} />
        <Text className="text-cardinal font-helvetica-light text-12">
          Share
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Share;
