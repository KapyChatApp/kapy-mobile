import { View, Text } from "react-native";
import React from "react";
import MessageBox from "../../shared/message/MessageBox";
import { ScrollView } from "react-native-gesture-handler";

const SidebarRecents = ({ items }: any) => {
  return (
    <View>
      <Text className="text-14 font-helvetica-bold ml-[20px]">Recents</Text>
      <ScrollView className="reecent-list p-[4px] overflow-hidden">
        <MessageBox></MessageBox>
        <MessageBox></MessageBox>
        <MessageBox></MessageBox>
        <MessageBox></MessageBox>
        <MessageBox></MessageBox>
        <MessageBox></MessageBox>
      </ScrollView>
    </View>
  );
};

export default SidebarRecents;
