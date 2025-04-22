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
  const [localUser, setLocalUser] = useState<any>(null);

  const fetchPosts = useCallback(
    async (pageNumber: number) => {
      if (loading || !hasMore) return;

      setLoading(true);
      try {
        const newPosts = await getMyComunityPosts(pageNumber, 2);
        if (newPosts.length === 0) {
          setHasMore(false);
        } else {
          setPosts((prev) => [...prev, ...newPosts]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore]
  );

  const getLocalUser = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        setLocalUser(JSON.parse(user));
      }
    } catch (error) {
      console.error("Error loading local user:", error);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  useEffect(() => {
    getLocalUser();
  }, []);

  const loadMorePosts = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const renderFooter = () =>
    loading ? <ActivityIndicator size="large" color="#F57206" /> : null;

  return (
    <View className={`flex ${bgLight500Dark10} flex-1`} style={{ rowGap: 20 }}>
      <View className="pt-[10px]">
        <Search />
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View className="p-[12px]">
            <SocialPost {...item} />
          </View>
        )}
        ListHeaderComponent={
          <View>
            <CreatePost avatarURL={localUser?.avatar || ""} />
          </View>
        }
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ItemSeparatorComponent={() => <View style={{ height: 26 }} />}
      />
    </View>
  );
};

export default PostPage;
