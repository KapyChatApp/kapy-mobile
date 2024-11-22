import { View, Text } from "react-native";
import React from "react";
import MessageBox from "../../shared/message/MessageBox";
import { ScrollView } from "react-native-gesture-handler";
import { textLight0Dark500 } from "@/styles/theme";

const SidebarRecents = ({ items }: any) => {
  return (
    <View>
      <Text className={`text-14 font-helvetica-bold ml-[20px] ${textLight0Dark500}`}>Recents</Text>
      <ScrollView className="reecent-list p-[4px] overflow-hidden">
       
      </ScrollView>
    </View>
  );
};

export default SidebarRecents;
