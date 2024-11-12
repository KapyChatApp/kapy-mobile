import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getFriendPosts } from "@/requests/post";
import { SocialPostProps } from "@/types/post";
import SocialPost from "./SocialPost";
import SocialSkeletonLoader from "@/components/ui/PostSkeletonLoader";

const FriendPostList = ({ friendId }: { friendId: string }) => {
  const [postsData, setPostsData] = useState<SocialPostProps[]>([]);
  useEffect(() => {
    const getFriendPostFunc = async () => {
      console.log("outsideId ", friendId);
      const postsData: SocialPostProps[] = await getFriendPosts(friendId);
      setPostsData(postsData);
    };
    getFriendPostFunc();
  }, []);
  return (
    <View
      className="flex-1 items-center justify-center w-full px-[15px]"
      style={{ rowGap: 20 }}
    >
      {postsData.length != 0 ? (
        postsData.map((item) => <SocialPost key={item._id} {...item} />)
      ) : (
        <View className="flex-1 w-full">
          <SocialSkeletonLoader />
          <SocialSkeletonLoader />
          <SocialSkeletonLoader />
          <SocialSkeletonLoader />
          <SocialSkeletonLoader />
          <SocialSkeletonLoader />
        </View>
      )}
    </View>
  );
};

export default FriendPostList;
