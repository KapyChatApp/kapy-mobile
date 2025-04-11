import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { textLight0Dark500 } from "@/styles/theme";

const FriendLinkName = ({
  _id,
  fullName,
  fontSize,
}: {
  _id: string;
  fullName: string;
  fontSize: number;
}) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/friend/friend-profile/[friendId]",
          params: { friendId: _id },
        })
      }
    >
      <Text className={`font-helvetica-bold ${textLight0Dark500}`} style={{ fontSize: fontSize }}>
        {fullName}
      </Text>
    </TouchableOpacity>
  );
};

export default FriendLinkName;
