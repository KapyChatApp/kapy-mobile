import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import SocialPost from "@/components/shared/community/SocialPost";
import Previous from "@/components/ui/Previous";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import Comment from "@/components/shared/community/Comment";
import CommentTyping from "@/components/shared/community/CommentTyping";
import { commentsData } from "@/data/CommentData";
import { getAPost } from "@/requests/post";
import { SocialPostProps } from "@/types/post";

const PostDetailPage = () => {
  const { postId } = useLocalSearchParams();
  const [post, setPost] = useState<SocialPostProps>();
  const router = useRouter();
  const navigation = useNavigation();
  useEffect(() => {
    const getPostDetail = async () => {
      const result = await getAPost(postId.toString(),() => router.push("/not-found"));
      setPost(result);
    };
    getPostDetail();
  }, []);
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView className={`flex-1 ${bgLight500Dark10}`}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ rowGap: 20, paddingHorizontal: 10 }}
        >
          <View className="ml-[10px] mt-[10px]">
            <Previous navigation={navigation} isAbsolute={false} />
          </View>
          {post ? <SocialPost {...post} isDetail={true} /> : null}

          <Text className={`${textLight0Dark500} font-helvetica-light text-14`}>
            Comments
          </Text>
          <View className="px-[10px]">
            {commentsData.map((item, index) => (
              <Comment isReply={false} key={item.id} comment={item} />
            ))}
          </View>
        </ScrollView>
        <CommentTyping />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default PostDetailPage;
