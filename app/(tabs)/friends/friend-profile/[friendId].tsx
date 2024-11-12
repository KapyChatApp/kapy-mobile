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
import ReportForm from "@/components/shared/community/ReportForm";
import SocialPost from "@/components/shared/community/SocialPost";
import { HeadProfileProps, UserBioProps } from "@/types/user";
import CustomButton from "@/components/ui/CustomButton";
import DenyButton from "@/components/ui/DenyButton";
import { unBFF, unFriend } from "@/requests/un-request";
import { acceptBFF, acceptFriend } from "@/requests/accept-request";
import { addBFF, addFriend } from "@/requests/add-request";
import { IconURL } from "@/constants/IconURL";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { getFriendProfile } from "@/requests/friend-profile";
import FriendPostList from "@/components/shared/community/FriendPostList";
import HeadProfileSkeletonLoader from "@/components/ui/HeadProfileSkeletonLoader";
const FriendProfilePage = () => {
  const { friendId } = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();
  const [isReportOpen, setIsReportOpen] = useState(false);
  const postContent = [
    "Nội dung bài post",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam voluptatibus maxime quam quod, itaque optio fugit repudiandae quis asperiores facere eveniet quasi perspiciatis cumque veritatis, perferendis similique placeat, voluptatum ullam?",
    "Một bài post khác như thế này luôn",
    "HAHAHAHAAH",
    "HIHIHIHIHIHIHI",
  ];
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
  useEffect(() => {
    const disPlayUserData = async () => {
      try {
        const friendData = await getFriendProfile(friendId);
        const {
          _id,
          firstName,
          lastName,
          nickName,
          bio,
          avatar,
          background,
          relation,
          ..._bio
        } = friendData;
        setHeaderProps({
          firstName,
          lastName,
          nickName,
          bio,
          avatar,
          background,
        });
        setBioProps(_bio);
        setRelation(relation);
        setFriendedId(_id.toString());
        setIsProfileLoading(false);
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
    <SafeAreaView className={`flex-1 ${bgLight500Dark10}`}>
      <ScrollView>
        {false? (     <HeadProfile {...headerProps} />):(<HeadProfileSkeletonLoader/>)}
        <Previous navigation={navigation} isAbsolute={true} />
        <MoreProfileOption
          setIsReportOpen={setIsReportOpen}
          setStartLoading={() => setLoading(true)}
          setEndLoading={() => setLoading(false)}
          setIsLoading={() => setIsLoading(true)}
          setNotIsLoading={() => setIsLoading(false)}
          friendId={friendedId}
        />
        <View className={`${Platform.OS === "android" ? "mt-[60px]" : "mt-[20px]"}`}>
          {RelationButtonGroups()}
        </View>

        <UserBio {...bioProps} />
        {relation === "bff" ? (
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
        {relation === "bff" ? (
          <View className="flex  items-center w-full">
            {friendedId? (   <FriendPostList friendId={friendedId}/>):null}
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
      </ScrollView>
      {isReportOpen ? <ReportForm setIsOpen={setIsReportOpen} /> : null}
      {loading ? <LoadingSpinner loading={isLoading} /> : null}
    </SafeAreaView>
  );
};

export default FriendProfilePage;
