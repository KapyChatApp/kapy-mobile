import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getMyPosts } from "@/requests/post";
import { SocialPostProps } from "@/types/post";
import SocialPost from "./SocialPost";
import SocialSkeletonLoading from "@/components/ui/PostSkeletonLoader";

const MyPostList = () => {
  const [postsData, setPostsData] = useState<SocialPostProps[]>([]);
  useEffect(() => {
    const getMyPostFunc = async () => {
      const postsData:SocialPostProps[] = await getMyPosts();
      setPostsData(postsData);
    };
    getMyPostFunc();
  }, []);
  return (
    <View className="flex-1 items-center justify-center" style={{rowGap:20}}>
      {postsData.length!=0? ( postsData.map((item)=><SocialPost key={item._id} {...item}/>)):(
        <View className="w-full" style={{rowGap:30}}>
        <SocialSkeletonLoading/>
        <SocialSkeletonLoading/>
        <SocialSkeletonLoading/>
        <SocialSkeletonLoading/>
        <SocialSkeletonLoading/>
        </View>
        
      )}
    </View>
  );
};

export default MyPostList;