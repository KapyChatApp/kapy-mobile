import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import HeadProfile from "@/components/shared/community/HeadProfile";
import { ScrollView } from "react-native-gesture-handler";
import Previous from "@/components/ui/Previous";
import UserBio from "@/components/shared/community/UserBio";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HeadProfileProps, UserBioProps } from "@/types/user";
import axios from "axios";
import CreatePost from "@/components/ui/CreatePost";

const MyWallPage = () => {
  const navigation = useNavigation();
  const [headerProps, setHeaderProps] = useState<HeadProfileProps>();
  const [bioProps, setBioProps] = useState<UserBioProps | undefined>();
  useEffect(() => {
    const disPlayUserData = async () => {
      const user = await AsyncStorage.getItem("user");
      if (!user) {
        throw new Error("You are unauthenticated!");
      }
      const {
        firstName,
        lastName,
        nickName,
        bio,
        avatar,
        background,
        ..._bio
      } = JSON.parse(user);

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
      <ScrollView className="px-[10px]">
        <HeadProfile {...headerProps} />
        <Previous navigation={navigation} isAbsolute={true} />
        <UserBio {...bioProps} />
        <View className="w-full h-[200px]"></View>
        <Text className={`${textLight0Dark500} font-helvetica-bold text-14`}>Posts</Text>
        <CreatePost avatarURL={headerProps?.avatar}/>
        <View className="w-full h-[200px]"></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyWallPage;
