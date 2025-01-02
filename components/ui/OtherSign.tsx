import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const OtherSign = ({ cause, solving, link }: any) => {
  return (
    <View className="forgot-wrapper mt-2 mb-2">
      <Text>
        <Text className="text-12 font-helvetica-light text-dark dark:text-white">
          {cause}
        </Text>
        <Link href={link} className="font-helvetica-bold text-cardinal text-12">
          {solving}
        </Link>
      </Text>
    </View>
  );
};

export default OtherSign;
