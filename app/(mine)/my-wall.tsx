import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import HeadProfile from "@/components/shared/community/HeadProfile";
import { ScrollView } from "react-native-gesture-handler";
import Previous from "@/components/ui/Previous";
import UserBio from "@/components/shared/community/UserBio";
import { bgLight500Dark10 } from "@/styles/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HeadProfileProps, UserBioProps } from "@/types/user";
import axios from "axios";

const MyWallPage = () => {
  const navigation = useNavigation();
  const [headerProps, setHeaderProps] = useState<
    HeadProfileProps | undefined
  >();
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
      <ScrollView>
        <HeadProfile {...headerProps} />
        <Previous navigation={navigation} isAbsolute={true} />
        <UserBio {...bioProps} />
        <View className="w-full h-[300px]"></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyWallPage;