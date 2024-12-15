import { View, Text, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import HeadProfile from "@/components/shared/community/HeadProfile";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import Previous from "@/components/ui/Previous";
import UserBio from "@/components/shared/community/UserBio";
import UnblockPostView from "@/components/shared/community/UnblockPostView";
import MoreProfileOption from "@/components/shared/community/MoreProfileOption";
import { HeadProfileProps, UserBioProps } from "@/types/user";
import CustomButton from "@/components/ui/CustomButton";
import DenyButton from "@/components/ui/DenyButton";
import { unBFF, unFriend } from "@/lib/un-request";
import { acceptBFF, acceptFriend } from "@/lib/accept-request";
import { addBFF, addFriend } from "@/lib/add-request";
import { IconURL } from "@/constants/IconURL";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { getFriendProfile } from "@/lib/friend-profile";
import FriendPostList from "@/components/shared/community/FriendPostList";
import HeadProfileSkeletonLoader from "@/components/ui/HeadProfileSkeletonLoader";
import BioSkeletonLoader from "@/components/ui/BioSkeletonLoader";
import SocialSkeletonLoader from "@/components/ui/PostSkeletonLoader";
import { RateProps } from "@/types/rate";
import { getRatesOfUser } from "@/lib/rate";
import RecentRate from "@/components/shared/community/RecentRate";
const FriendProfilePage = () => {
  const { friendId } = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();
  const [headerProps, setHeaderProps] = useState<
    HeadProfileProps | undefined
  >();
  const [bioProps, setBioProps] = useState<UserBioProps | undefined>();
  const [relation, setRelation] = useState("stranger");
  const [friendedId, setFriendedId] = useState("");

  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [reload, setReload] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [recentRates, setRecentRates] = useState<RateProps[]>([]);

  const [localUserId, setLocalUserId] = useState("");
  useEffect(() => {
    const disPlayUserData = async () => {
      try {
        const friendData = await getFriendProfile(friendId, () =>
          setIsProfileLoading(false)
        );
        const {
          _id,
          firstName,
          lastName,
          nickName,
          bio,
          avatar,
          background,
          relation,
          point,
          mutualFriends,
          ..._bio
        } = friendData;
        setHeaderProps({
          firstName,
          lastName,
          nickName,
          bio,
          avatar,
          background,
          point,
          mutualFriends,
        });
        setBioProps(_bio);
        setRelation(relation);
        const recentRates = await getRatesOfUser(_id);
        setRecentRates(recentRates);
        setFriendedId(_id.toString());
      } catch (error) {
        console.log(error);
        router.push("/(tabs)/friends/not-found");
      }
    };

    disPlayUserData();
  }, [reload]);
  const RelationButtonGroups = () => {
    switch (relation) {
      case "friend":
        return (
          <View
            className="flex-1 flex items-center justify-center top-[180px] flex-row"
            style={{ columnGap: 4 }}
          >
            <CustomButton
              width={120}
              height={40}
              label="Friend"
              fontSize={14}
              iconURL={IconURL.is_friend_btn}
              iconSize={18}
              onPress={async () =>
                await unFriend(friendedId, () => setRelation("stranger"))
              }
            />
            <CustomButton
              width={120}
              height={40}
              fontSize={14}
              iconURL={IconURL.is_bff_btn}
              iconSize={18}
              label="Add bff"
              type={true}
              onPress={async () =>
                await addBFF(friendedId, () => setRelation("sent_bff"))
              }
            />
          </View>
        );
      case "bff":
        return (
          <View
            className="flex-1 flex items-center justify-center top-[180px] flex-row"
            style={{ columnGap: 4 }}
          >
            <CustomButton
              width={120}
              height={40}
              label="Unfriend"
              fontSize={14}
              iconURL={IconURL.is_friend_btn}
              iconSize={18}
              onPress={async () =>
                await unFriend(friendedId, () => setRelation("stranger"))
              }
            />
            <CustomButton
              width={120}
              height={40}
              label="UnBFF"
              fontSize={14}
              type={true}
              iconURL={IconURL.is_bff_btn}
              iconSize={18}
              onPress={async () =>
                await unBFF(friendedId, () => setRelation("friend"))
              }
            />
          </View>
        );
      case "sent_bff":
        return (
          <View
            className="flex-1 flex items-center justify-center top-[180px] flex-row"
            style={{ columnGap: 4 }}
          >
            <CustomButton
              width={120}
              height={40}
              label="Requested"
              type={true}
              fontSize={14}
              iconURL={IconURL.pending_btn}
              iconSize={18}
              onPress={async () =>
                await unBFF(friendedId, () => setRelation("friend"))
              }
            />
          </View>
        );
      case "received_bff":
        return (
          <View
            className="flex-1 flex items-center justify-center top-[180px] flex-row"
            style={{ columnGap: 4 }}
          >
            <DenyButton
              width={120}
              height={40}
              label="Deny"
              type={true}
              fontSize={14}
              onPress={async () =>
                await unBFF(friendedId, () => setRelation("friend"))
              }
            />
            <CustomButton
              width={120}
              height={40}
              label="Accept"
              type={true}
              fontSize={14}
              iconURL={IconURL.is_bff_btn}
              iconSize={18}
              onPress={async () =>
                await acceptBFF(friendedId, () => setRelation("bff"))
              }
            />
          </View>
        );
      case "sent_friend":
        return (
          <View
            className="flex-1 flex items-center justify-center top-[180px] flex-row"
            style={{ columnGap: 4 }}
          >
            <CustomButton
              width={120}
              height={40}
              label="Requested"
              fontSize={14}
              iconURL={IconURL.pending_btn}
              iconSize={18}
              onPress={async () =>
                await unFriend(friendedId, () => setRelation("stranger"))
              }
            />
          </View>
        );
      case "received_friend":
        return (
          <View
            className="flex-1 flex items-center justify-center top-[180px] flex-row"
            style={{ columnGap: 4 }}
          >
            <DenyButton
              width={120}
              height={40}
              label="Deny"
              fontSize={14}
              onPress={async () =>
                await unFriend(friendedId, () => setRelation("stranger"))
              }
            />
            <CustomButton
              width={120}
              height={40}
              label="Accept"
              fontSize={14}
              iconURL={IconURL.is_friend_btn}
              iconSize={18}
              onPress={async () =>
                await acceptFriend(friendedId, () => setRelation("friend"))
              }
            />
          </View>
        );
      default:
        return (
          <View
            className="flex-1 flex items-center justify-center top-[180px] flex-row"
            style={{ columnGap: 4 }}
          >
            <CustomButton
              width={120}
              height={40}
              label="Add friend"
              iconURL={IconURL.is_friend_btn}
              iconSize={18}
              fontSize={14}
              onPress={async () =>
                await addFriend(friendedId, () => setRelation("sent_friend"))
              }
            />
          </View>
        );
    }
  };
  return (
    <View className={`flex-1 ${bgLight500Dark10}`}>
      <ScrollView>
        {isProfileLoading ? (
          <HeadProfileSkeletonLoader />
        ) : (
          <HeadProfile {...headerProps} />
        )}
        <Previous navigation={navigation} isAbsolute={true} />
        <MoreProfileOption
          setStartLoading={() => setLoading(true)}
          setEndLoading={() => setLoading(false)}
          setIsLoading={() => setIsLoading(true)}
          setNotIsLoading={() => setIsLoading(false)}
          friendId={friendedId}
        />
        <View
          className={`${Platform.OS === "android" ? "mt-[60px]" : "mt-[20px]"}`}
        >
          {isProfileLoading ? null : RelationButtonGroups()}
        </View>
        <View
          className={`${
            Platform.OS === "ios" ? "top-[200px] " : "top-[220px]"
          } flex `}
          style={{ rowGap: 20 }}
        >
          <View className="px-[10px]">
            <RecentRate
              path="/(tabs)/friends/all-friend-rate"
              userId={friendId.toString()}
              recentRates={recentRates}
            />
          </View>

          {isProfileLoading ? <BioSkeletonLoader /> : <UserBio {...bioProps} />}

          {relation === "bff" ? (
            <View className="w-full px-[12px] mb-[10px]" style={{ rowGap: 10 }}>
              <View className="w-full h-[0.5px] bg-border "></View>
              <Text
                className={`${textLight0Dark500} font-helvetica-bold w-full p-[10px] text-16`}
              >
                Posts
              </Text>
            </View>
          ) : null}
          {relation === "bff" ? (
            <View className="flex  items-center w-full">
              {friendedId ? (
                isProfileLoading ? (
                  <View className="flex" style={{ rowGap: 20 }}>
                    <SocialSkeletonLoader />
                    <SocialSkeletonLoader />
                    <SocialSkeletonLoader />
                    <SocialSkeletonLoader />
                    <SocialSkeletonLoader />
                  </View>
                ) : (
                  <FriendPostList friendId={friendedId} />
                )
              ) : null}
            </View>
          ) : (
            <UnblockPostView
              friendId={friendedId}
              relation={relation}
              lastName={headerProps?.lastName}
              reload={() => setReload(true)}
            />
          )}
          <View className="w-full h-[60px]"></View>
        </View>
      </ScrollView>
      {loading ? <LoadingSpinner loading={isLoading} /> : null}
    </View>
  );
};

export default FriendProfilePage;
