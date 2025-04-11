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

  // 🏆 1. Hàm lấy dữ liệu bài viết (Đã sửa lỗi trùng lặp)
  const fetchPosts = useCallback(async (pageNumber: number) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newPosts = await getMyComunityPosts(pageNumber, 10);

      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => {
          // 🔥 Loại bỏ bài trùng lặp bằng cách kiểm tra _id
          const postIds = new Set(prev.map((post) => post._id));
          const filteredNewPosts = newPosts.filter((post:SocialPostProps) => !postIds.has(post._id));
          return [...prev, ...filteredNewPosts];
        });
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore]);

  // 🏆 2. Lấy dữ liệu user từ AsyncStorage
  const getLocalUser = async () => {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      setLocalUser(JSON.parse(user));
    }
  };

  // 🏆 3. useEffect theo dõi `page` để gọi API
  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  useEffect(() => {
    getLocalUser();
  }, []);

  // 🏆 4. Hàm load thêm dữ liệu khi scroll đến cuối danh sách
  const loadMorePosts = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  // 🏆 5. Hiển thị loading khi đang tải dữ liệu
  const renderFooter = () => (loading ? <ActivityIndicator size="large" color="#0000ff" /> : null);

  return (
    <View className={`flex ${bgLight500Dark10} flex-1`} style={{ rowGap: 20 }}>
      <View className="pt-[10px]">
        <Search />
      </View>
      <FlatList
        ListHeaderComponent={() => (
          <View className="">
            <CreatePost avatarURL={localUser ? localUser.avatar : ""} />
          </View>
        )}
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) =><View className="p-[12px]"> <SocialPost {...item} /></View>}
        onEndReached={loadMorePosts} // Load thêm khi chạm cuối danh sách
        onEndReachedThreshold={0.5} // Khi còn 50% danh sách thì bắt đầu tải
        ListFooterComponent={renderFooter}
        ItemSeparatorComponent={() => <View style={{ height: 26 }} />}
      />
    </View>
  );
};

export default PostPage;