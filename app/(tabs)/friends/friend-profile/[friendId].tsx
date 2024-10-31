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
import CustomButton from "@/components/ui/CustomButton";
import DenyButton from "@/components/ui/DenyButton";
import { unBFF, unFriend } from "@/requests/un-request";
import { acceptBFF, acceptFriend } from "@/requests/accept-request";
import { addBFF, addFriend } from "@/requests/add-request";

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
  const [relation, setRelation] = useState("stranger");
  const [friendedId, setFriendedId] = useState("");
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
          params: { friendId: friendId },
        }
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
        ..._bio
      } = response.data;
      console.log("relation", response.data);
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
    };

    disPlayUserData();
  }, []);
  const RelationButtonGroups = () => {
    switch (relation) {
      case "friend":
        return (
          <View
            className="flex-1 flex items-center justify-center top-[180px] flex-row"
            style={{ columnGap: 4 }}
          >
            <DenyButton
              width={120}
              height={40}
              label="Unfriend"
              onPress={async ()=> await unFriend(friendedId, () => setRelation("stranger"))}
            />
            <CustomButton width={120} height={40} label="Add bff" type={true} onPress={async ()=> await addBFF(friendedId,()=> setRelation("sent_bff"))} />
          </View>
        );
      case "bff":
        return (
          <View
            className="flex-1 flex items-center justify-center top-[180px] flex-row"
            style={{ columnGap: 4 }}
          >
            <DenyButton
              width={120}
              height={40}
              label="Unfriend"
              onPress={async()=>await unFriend(friendedId, () => setRelation("stranger"))}
            />
            <DenyButton width={120} height={40} label="UnBFF" onPress={async()=>await unBFF(friendedId, () => setRelation("friend"))} />
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
              onPress={async ()=> await unBFF(friendedId, () => setRelation("friend"))}
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
             onPress={async ()=> await unBFF(friendedId, ()=>  setRelation("friend"))}/>
            <CustomButton
              width={120}
              height={40}
              label="Accept"
              type={true}
              onPress={async ()=> await acceptBFF(friendedId, ()=>  setRelation("bff"))}
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
              onPress={async ()=>await unFriend(friendedId, () => setRelation("stranger"))}
            />
          </View>
        );
      case "received_friend":
        return (
          <View
            className="flex-1 flex items-center justify-center top-[180px] flex-row"
            style={{ columnGap: 4 }}
          >
            <DenyButton width={120} height={40} label="Deny" onPress={async ()=>await unFriend(friendedId, ()=>  setRelation("stranger"))}/>
            <CustomButton width={120} height={40} label="Accept" onPress={async ()=>await acceptFriend(friendedId, ()=>  setRelation("friend"))} />
          </View>
        );
      default:
        return (
          <View
            className="flex-1 flex items-center justify-center top-[180px] flex-row"
            style={{ columnGap: 4 }}
          >
            <CustomButton width={120} height={40} label="Add friend" onPress={async()=>await addFriend(friendedId,()=> setRelation("sent_friend"))} />
          </View>
        );
    }
  };
  return (
    <SafeAreaView className={`flex-1 ${bgLight500Dark10}`}>
      <ScrollView>
        <HeadProfile {...headerProps} />
        <Previous navigation={navigation} isAbsolute={true} />
        <MoreProfileOption setIsReportOpen={setIsReportOpen} />
        {RelationButtonGroups()}
        <UserBio {...bioProps} />
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
