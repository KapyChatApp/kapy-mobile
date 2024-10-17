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
import SocialPost from "@/components/shared/community/SocialPost";

const FriendProfilePage = () => {
  const { friendId } = useLocalSearchParams();
  const navigation = useNavigation();
  const isBFF = true;
  const [isReportOpen, setIsReportOpen] = useState(false);
  const postContent =[
    'Nội dung bài post',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam voluptatibus maxime quam quod, itaque optio fugit repudiandae quis asperiores facere eveniet quasi perspiciatis cumque veritatis, perferendis similique placeat, voluptatum ullam?',
      'Một bài post khác như thế này luôn',
      'HAHAHAHAAH',
      'HIHIHIHIHIHIHI'
  ]
  return (
    <SafeAreaView className={`flex-1 ${bgLight500Dark10}`}>
      <ScrollView>
        <HeadProfile />
        <Previous navigation={navigation} isAbsolute={true} />
        <MoreProfileOption setIsReportOpen={setIsReportOpen} />
        <UserBio />
        {isBFF? (<View className="w-full h-[250px]"></View>):null}
        {isBFF ? (
          <View className="flex items-center px-[12px]" style={{rowGap:50}}>
          {postContent.map((item, index)=><SocialPost key={index} content={item} />)}
          </View>
        ) : <UnblockPostView />}
        <View className="w-full h-[60px]"></View>
      </ScrollView>
      {isReportOpen ? <ReportForm setIsOpen={setIsReportOpen} /> : null}
    </SafeAreaView>
  );
};

export default FriendProfilePage;
