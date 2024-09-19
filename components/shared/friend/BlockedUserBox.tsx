import { View, Text } from "react-native";
import React from "react";
import UserAvatar from "@/components/ui/UserAvatar";
import RequestButton from "@/components/ui/RequestButton";

const BlockedUserBox = () => {
  return (
    <View className="flex flex-row items-center justify-between">
      <View className="flex flex-row items-center justify-center">
        <UserAvatar size={57}></UserAvatar>
        <View>
          <Text>Name</Text>
          <Text>2 mutual friends</Text>
        </View>
      </View>
      <RequestButton width={76} height={31} label="Unblock"></RequestButton>
    </View>
  );
};

export default BlockedUserBox;
