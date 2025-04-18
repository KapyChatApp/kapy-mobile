import { View, Text, Platform, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "expo-router";
import HeadProfile from "@/components/shared/community/HeadProfile";
import { ScrollView } from "react-native-gesture-handler";
import Previous from "@/components/ui/Previous";
import UserBio from "@/components/shared/community/UserBio";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HeadProfileProps, UserBioProps } from "@/types/user";
import axios from "axios";
import CreatePost from "@/components/ui/CreatePost";
import SocialSkeletonLoader from "@/components/ui/PostSkeletonLoader";
import HeadProfileSkeletonLoader from "@/components/ui/HeadProfileSkeletonLoader";
import BioSkeletonLoader from "@/components/ui/BioSkeletonLoader";
import RecentRate from "@/components/shared/community/RecentRate";
import { getLocalAuth } from "@/lib/local";
import { RateProps } from "@/types/rate";
import { getRatesOfUser } from "@/lib/rate";
import { SocialPostProps } from "@/types/post";
import { getMyPosts } from "@/lib/post";
import SocialPost from "@/components/shared/community/SocialPost";
import { onRefresh } from "@/utils/Refresh";
import { getMyProfile } from "@/lib/my-profile";

const MyWallPage = () => {
  const navigation = useNavigation();
  const [headerProps, setHeaderProps] = useState<HeadProfileProps>();
  const [bioProps, setBioProps] = useState<UserBioProps | undefined>();
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [_id, set_id] = useState("");
  const [recentRates, setRecentRates] = useState<RateProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [postsData, setPostsData] = useState<SocialPostProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const disPlayUserData = async () => {
  

    const {
      _id,
      firstName,
      lastName,
      nickName,
      bio,
      avatar,
      background,
      point,
      ..._bio
    } = await getMyProfile();
    set_id(_id);
    setHeaderProps({
      firstName,
      lastName,
      nickName,
      bio,
      avatar,
      background,
      point,
    });
    const postsData: SocialPostProps[] = await getMyPosts(() =>
      setIsLoading(false)
    );
    setPostsData(postsData.reverse());
    setBioProps(_bio);
    const recentRates = await getRatesOfUser(_id);
    setRecentRates(recentRates);
    setIsProfileLoading(false);
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      disPlayUserData();
    }, [])
  );

  return (
    <View className={`flex-1 ${bgLight500Dark10}`}>
      <ScrollView
        className="px-[10px]"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh(async () => await disPlayUserData())}
          />
        }
      >
        {isProfileLoading ? (
          <HeadProfileSkeletonLoader />
        ) : (
          <HeadProfile {...headerProps} />
        )}
        <Previous navigation={navigation} isAbsolute={true} />
        <View
          className={`${
            Platform.OS === "ios" ? "top-[200px] " : "top-[220px]"
          } flex `}
          style={{ rowGap: 20 }}
        >
          <RecentRate path="/all-rate" userId={_id} recentRates={recentRates} />
          {isProfileLoading ? <BioSkeletonLoader /> : <UserBio {...bioProps} />}
          <Text
            className={`${textLight0Dark500} font-helvetica-bold text-14 mb-[20px]`}
          >
            Posts
          </Text>
          <CreatePost avatarURL={headerProps?.avatar} />
          <View className="w-full h-[30px]"></View>
          <View
            className="flex-1 items-center justify-center"
            style={{ rowGap: 20 }}
          >
            {postsData.length > 0 ? (
              !isLoading ? (
                postsData.map((item) => <SocialPost key={item._id} {...item} />)
              ) : (
                <View className="w-full" style={{ rowGap: 30 }}>
                  <SocialSkeletonLoader />
                  <SocialSkeletonLoader />
                </View>
              )
            ) : null}
          </View>
          <View className="w-full h-[200px]"></View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyWallPage;
