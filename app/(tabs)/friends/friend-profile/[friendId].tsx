import { View, Text } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import HeadProfile from "@/components/shared/community/HeadProfile";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { bgLight500Dark10 } from "@/styles/theme";
import Previous from "@/components/ui/Previous";
import UserBio from "@/components/shared/community/UserBio";
import UnblockPostView from "@/components/shared/community/UnblockPostView";
import MoreProfileOption from "@/components/shared/community/MoreProfileOption";
import ReportForm from "@/components/shared/community/ReportForm";

const FriendProfilePage = () => {
  const { friendId } = useLocalSearchParams();
  const navigation = useNavigation();
  const isBFF = true;
  const [isReportOpen, setIsReportOpen] = useState(false);
  return (
    <SafeAreaView className={`flex-1 ${bgLight500Dark10}`}>
      <ScrollView>
        <HeadProfile />
        <Previous navigation={navigation} isAbsolute={true} />
        <MoreProfileOption setIsReportOpen={setIsReportOpen} />
        <UserBio />
        {isBFF ? null : <UnblockPostView />}
        <View className="w-full h-[300px]"></View>
      </ScrollView>
      {isReportOpen ? <ReportForm setIsOpen={setIsReportOpen} /> : null}
    </SafeAreaView>
  );
};

export default FriendProfilePage;
