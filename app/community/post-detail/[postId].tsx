import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import SocialPost from "@/components/shared/community/SocialPost";
import Previous from "@/components/ui/Previous";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import Comment from "@/components/shared/community/Comment";
import CommentTyping from "@/components/shared/community/CommentTyping";

const PostDetailPage = () => {
  const { postId } = useLocalSearchParams();
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView className="flex-1"  behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <SafeAreaView className={`flex-1 ${bgLight500Dark10}`}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ rowGap: 20, paddingHorizontal: 10 }}
        >
          <View className="ml-[10px] mt-[10px]">
            <Previous navigation={navigation} isAbsolute={false} />
          </View>
          <SocialPost content={postId} />
          <Text className={`${textLight0Dark500} font-helvetica-light text-14`}>
            Comments
          </Text>
          <View className="px-[10px]">
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </View>
        </ScrollView>
        <CommentTyping />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default PostDetailPage;
