import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import HeadProfile from "@/components/shared/community/HeadProfile";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import Previous from "@/components/ui/Previous";
import UserBio from "@/components/shared/community/UserBio";
import UnblockPostView from "@/components/shared/community/UnblockPostView";
import MoreProfileOption from "@/components/shared/community/MoreProfileOption";
import ReportForm from "@/components/shared/community/ReportForm";
import SocialPost from "@/components/shared/community/SocialPost";
import { HeadProfileProps, UserBioProps } from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const FriendProfilePage = () => {
  const { friendId } = useLocalSearchParams();
  const navigation = useNavigation();
  const isBFF = true;
  const [isReportOpen, setIsReportOpen] = useState(false);
  // const postContent = [
  //   "Nội dung bài post",
  //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam voluptatibus maxime quam quod, itaque optio fugit repudiandae quis asperiores facere eveniet quasi perspiciatis cumque veritatis, perferendis similique placeat, voluptatum ullam?",
  //   "Một bài post khác như thế này luôn",
  //   "HAHAHAHAAH",
  //   "HIHIHIHIHIHIHI",
  // ];
  const [headerProps, setHeaderProps] = useState<
    HeadProfileProps | undefined
  >();
  const [bioProps, setBioProps] = useState<UserBioProps | undefined>();
  useEffect(() => {
    const disPlayUserData = async () => {
      const token = await AsyncStorage.getItem("token");

        const response = await axios.get(
          process.env.EXPO_PUBLIC_BASE_URL + "/friend/profile",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            params:{friendId:friendId}
          }
        );
    
      const {
        firstName,
        lastName,
        nickName,
        bio,
        avatar,
        background,
        ..._bio
      } = response.data;

      setHeaderProps({
        firstName,
        lastName,
        nickName,
        bio,
        avatar,
        background,
      });
      setBioProps(_bio);
    };

    disPlayUserData();
  }, []);
  return (
    <SafeAreaView className={`flex-1 ${bgLight500Dark10}`}>
      <ScrollView>
        <HeadProfile {...headerProps} />
        <Previous navigation={navigation} isAbsolute={true} />
        <MoreProfileOption setIsReportOpen={setIsReportOpen} />
        <UserBio {...bioProps}/>
        {isBFF ? (
          <View
            className="w-full mt-[250px] px-[12px] mb-[10px]"
            style={{ rowGap: 10 }}
          >
            <View className="w-full h-[0.5px] bg-border "></View>
            <Text
              className={`${textLight0Dark500} font-helvetica-bold w-full p-[10px] text-16`}
            >
              Posts
            </Text>
          </View>
        ) : null}
        {/* {isBFF ? (
          <View className="flex items-center px-[12px]" style={{ rowGap: 50 }}>
            {postContent.map((item, index) => (
              <SocialPost key={index} content={item} />
            ))}
          </View>
        ) : (
          <UnblockPostView />
        )} */}
        <View className="w-full h-[60px]"></View>
      </ScrollView>
      {isReportOpen ? <ReportForm setIsOpen={setIsReportOpen} /> : null}
    </SafeAreaView>
  );
};

export default FriendProfilePage;
