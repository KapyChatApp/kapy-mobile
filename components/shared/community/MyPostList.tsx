import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getMyPosts } from "@/lib/post";
import { SocialPostProps } from "@/types/post";
import SocialPost from "./SocialPost";
import SocialSkeletonLoading from "@/components/ui/PostSkeletonLoader";

const MyPostList = () => {
  const [postsData, setPostsData] = useState<SocialPostProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getMyPostFunc = async () => {
      const postsData: SocialPostProps[] = await getMyPosts(() =>
        setIsLoading(false)
      );
      setPostsData(postsData.reverse());
    };
    getMyPostFunc();
  }, []);
  return (
    <View className="flex-1 items-center justify-center" style={{ rowGap: 20 }}>
      {postsData.length > 0 ? (
        !isLoading ? (
          postsData.map((item) => <SocialPost key={item._id} {...item} />)
        ) : (
          <View className="w-full" style={{ rowGap: 30 }}>
            <SocialSkeletonLoading />
            <SocialSkeletonLoading />
            <SocialSkeletonLoading />
            <SocialSkeletonLoading />
            <SocialSkeletonLoading />
          </View>
        )
      ) : null}
    </View>
  );
};

export default MyPostList;
