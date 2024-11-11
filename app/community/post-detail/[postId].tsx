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
  const [replyName, setReplyName] = useState("");
  const [replyCommentId, setReplyCommentId] = useState("");
  const [targetType, setTargetType] = useState("post");
  useEffect(() => {
    const getPostDetail = async () => {
      const result = await getAPost(postId.toString(), () =>
        router.push("/not-found")
      );
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
            {post?.comments.map((item, index) => (
              <Comment key={item._id} {...item} setReplyName={setReplyName} replyName={replyName} setReplyCommentId={setReplyCommentId} setTargetType={setTargetType} isLastComment={index === post.comments.length-1? true:false}/>
            ))}
          </View>
        </ScrollView>
        <CommentTyping
          replyId={replyName.length==0? post?._id:replyCommentId}
          replyName={replyName}
          setReplyName={setReplyName}
          targetType={targetType}
          setTargetType={setTargetType}
          
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default PostDetailPage;
