import { View, Text } from "react-native";
import React, { useState } from "react";
import UserAvatarLink from "@/components/ui/UserAvatarLink";
import Reply from "@/components/ui/Reply";
import { textLight0Dark500 } from "@/styles/theme";
import CommentLove from "@/components/ui/CommentLove";
import { TouchableOpacity } from "react-native-gesture-handler";

// Recursive component to render nested comments
const Comment = ({ comment, isReply, isLastReply }: any) => {
  const [isShowReply, setIsShowReply] = useState(false);
  const haveReplies = comment.replies && comment.replies.length > 0;

  return (
    <View className="flex flex-row">
      {/* Đường dọc làm cây comment */}

        <View
          className="border-l border-light-330 mr-2"
          style={{
            width: 10,
            marginLeft: isReply ? 10 : 0,
            height: isLastReply ? "50%" : "100%", // Nếu là reply cuối cùng thì chỉ kẻ 50% chiều cao
            alignSelf: "flex-start", // Đảm bảo đường kẻ canh phía trên của comment
          }}
        />


      <View className="flex pb-[10px]" style={{ rowGap: 14 }}>
        <View
          className={`flex border border-border ${
            isReply ? "py-[4px]" : "py-[6px]"
          } px-[12px] rounded-3xl place-self-start justify-self-start min-w-[200px]`}
          style={{ alignSelf: "flex-start" }}
        >
          <View
            className="flex flex-row items-center w-fit"
            style={{ columnGap: 10 }}
          >
            <UserAvatarLink size={isReply ? 30 : 40} />
            <View className="flex mb-[18px]" style={{ rowGap: isReply ? 2 : 5 }}>
              <Text
                className={`${textLight0Dark500} font-helvetica-bold ${
                  isReply ? "text-12" : "text-14"
                }`}
              >
                {comment.user}
              </Text>
              <Text
                className={`${textLight0Dark500} font-helvetica-light ${
                  isReply ? "text-10" : "text-12"
                }`}
              >
                {comment.content}
              </Text>
            </View>
          </View>
          <View
            className="flex flex-row absolute items-end  -bottom-[14px] left-[10px]"
            style={{ columnGap: 8 }}
          >
            <Text className="text-dark-330 text-10">{comment.time}</Text>
            <CommentLove />
            <Reply />
          </View>
        </View>

        {/* Toggle show/hide replies */}
        {haveReplies ? (
          <TouchableOpacity
            onPress={() => setIsShowReply(!isShowReply)}
            style={{ zIndex: 10 }}
          >
            <Text className={`${textLight0Dark500} ml-[50px] mt-[6px] text-10`}>
              {isShowReply ? "Hide replies..." : "Show replies..."}
            </Text>
          </TouchableOpacity>
        ) : null}

        {/* Render nested replies if isShowReply is true */}
        {isShowReply &&
          comment.replies.map((reply: any, index: number) => (
            <Comment
              key={reply.id}
              comment={reply}
              isReply={true}
              isLastReply={index === comment.replies.length - 1} // Kiểm tra nếu là reply cuối cùng
            />
          ))}
      </View>
    </View>
  );
};

export default Comment;
