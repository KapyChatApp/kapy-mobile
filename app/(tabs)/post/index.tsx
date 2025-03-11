import { View, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import Search from "@/components/shared/function/Search";
import { bgLight500Dark10 } from "@/styles/theme";
import { SocialPostProps } from "@/types/post";
import { getMyComunityPosts } from "@/lib/social";
import SocialPost from "@/components/shared/community/SocialPost";
import CreatePost from "@/components/ui/CreatePost";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PostPage = () => {
  const [posts, setPosts] = useState<SocialPostProps[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [localUser, setLocalUser] = useState(null);

  const fetchPosts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const newPosts = await getMyComunityPosts(page, 10);
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  const getLocalUser=async()=>{
   const user = await AsyncStorage.getItem("user");
   const userData = await JSON.parse(user!);
   console.log("user: ", userData);
    setLocalUser(userData);
}

  useEffect(() => {
    fetchPosts();
    getLocalUser();
  }, []);

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  return (
    <View className={`flex ${bgLight500Dark10} flex-1`} style={{rowGap:20}}>
      <View className="pt-[10px]">
        <Search />
      </View>
      <CreatePost avatarURL={localUser? localUser.avatar: ""}/>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <SocialPost {...item} />}
        onEndReached={fetchPosts} // Load thêm khi chạm cuối danh sách
        onEndReachedThreshold={0.5} // Khi còn 50% danh sách thì bắt đầu tải
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default PostPage;
