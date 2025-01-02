import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import Previous from "@/components/ui/Previous";
import { useNavigation, useRouter } from "expo-router";
import UserAvatar from "@/components/ui/UserAvatar";
import { textLight0Dark500 } from "@/styles/theme";
import { HeadProfileProps } from "@/types/user";

const HeadProfile = (props:HeadProfileProps) => {
  const router = useRouter();
  return (
    <View className="flex items-center justify-center relative">
      <Image source={{uri:props.background}} className="w-screen h-[200px] bg-deny "></Image>
      <View className=" flex items-center justify-center absolute top-[90px]">
        <UserAvatar avatarURL={{uri:props.avatar}} size={176}></UserAvatar>
        <Text className="text-24 font-helvetica-bold text-cardinal mt-[4px]">{props.firstName + ' '+ props.lastName}</Text>
        <Text className={`text-14 font-helvetica-light my-[2px] ${textLight0Dark500}`}>({props.nickName})</Text>
        
        <View className="flex flex-row items-center justify-center">
          <Text className={`text-14 font-helvetica-light ${textLight0Dark500}`}>Community Point: </Text>
          <Text className="text-18 font-helvetica-bold text-cardinal">{props.point}</Text>
        </View>
        {props.mutualFriends?.length!=0 && props.mutualFriends? 
        <Pressable className="flex flex-row items-center justify-center" style={{columnGap:5}}  onPress={()=>router.push({pathname:"/friend/mutual-friends",params:{friendId:props._id}})}>
          {props.mutualFriends?.map((item, index)=>index<=2?<UserAvatar key={index} size={20} avatarURL={{uri:item.avatar}}/>:null)}
          {props.mutualFriends?.length!>3?<View className="w-[20px] h-[20px] bg-light-330 flex items-center justify-center rounded-full"><Text className="text-white font-helvetica-light text-10">{props.mutualFriends?.length! - 3}+</Text></View>:null}
          
          <Text className={`${textLight0Dark500}  font-helvetica-light text-12`}>{props.mutualFriends?.length!>1? "mutual friends":"mutual friend"}</Text>
        </Pressable>:null}
        <Text className={`text-16 font-helvetica-light my-[8px] ${textLight0Dark500}`}>{props.bio}</Text>

      </View>
    </View>
  );
};

export default HeadProfile;
