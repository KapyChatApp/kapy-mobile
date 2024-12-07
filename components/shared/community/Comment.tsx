import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import UserAvatarLink from "@/components/ui/UserAvatarLink";
import Reply from "@/components/ui/Reply";
import { textLight0Dark500 } from "@/styles/theme";
import CommentLove from "@/components/ui/CommentLove";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CommentProps } from "@/types/post";
import { formatDate } from "@/utils/DateFormatter";
import { getLocalAuth } from "@/lib/local-auth";
import { disLikeComment, likeComment } from "@/lib/comment-request";

const Comment = (props: CommentProps) => {
  const [isShowReply, setIsShowReply] = useState(false);
  const haveReplies = props.replieds && props.replieds.length > 0;
  const [liked, setLiked] = useState(false);

  const [totalLike, setTotalLike] = useState(props.likedIds.length);
  const [totalReply, setTotalReply] = useState(props.replieds.length);

  const handleLike = async () => {
    if (liked) {
      setTotalLike(totalLike - 1);
      await disLikeComment(props._id);
      setLiked(false);
    } else {
      setTotalLike(totalLike + 1);
      await likeComment(props._id);
      setLiked(true);
    }
  };

  useEffect(() => {
    const render = async () => {
      const { _id } = await getLocalAuth();
      if (props.likedIds.includes(_id.toString())) {
        setLiked(true);
      }
    };
    render();
  }, []);

  return (
    <View
      className={`flex ${
        props.isLastComment ? "" : "border-l-[1px]"
      } border-border ${props.isReply ? "ml-[18px]" : ""}`}
    >
      <View className="flex flex-row">
        <View />
        <View
          className={`h-[40px] w-[26px] rounded-b-3xl border-l-[1px] border-b-[1px] border-border ${
            props.isLastComment ? "" : "-left-[1px] "
          }`}
        ></View>
        <View className="flex py-[10px]">
          <View
            className={`flex border border-border px-3 ${
              props.isReply ? "rounded-2xl" : "rounded-3xl"
            }  ${props.isReply ? "py-2" : "py-2"} min-w-[200px] pb-[26px]`}
          >
            <View
              className="flex flex-row items-center w-fit "
              style={{ columnGap: 10 }}
            >
              <UserAvatarLink
                avatarURL={{ uri: props.avatar }}
                size={props.isReply ? 30 : 40}
              />
              <View className="flex" style={{ rowGap: props.isReply ? 2 : 5 }}>
                <Text
                  className={`${textLight0Dark500} font-helvetica-bold ${
                    props.isReply ? "text-10" : "text-12"
                  }`}
                >
                  {props.firstName} {props.lastName}
                </Text>
                <Text
                  className={`${textLight0Dark500} font-helvetica-light  ${
                    props.isReply ? "text-10" : "text-12"
                  }`}
                >
                  {props.caption}
                </Text>
              </View>
            </View>
            <View
              className="flex flex-row items-end absolute -bottom-[13px] left-2 "
              style={{ columnGap: 8 }}
            >
              <Text className="text-dark-330 text-10">
                {formatDate(props.createAt)}
              </Text>
              <CommentLove totalLike={totalLike} onPress={handleLike} />
              <Reply
                totalReply={totalReply}
                onPress={() => {
                  props.setReplyName(props.firstName + props.lastName);
                  props.setReplyCommentId(props._id);
                  props.setTargetType("comment");
                }}
              />
            </View>
          </View>
        </View>
      </View>
      <View className="flex ml-[24px] pt-[8px]">
        {haveReplies && (
          <TouchableOpacity
            onPress={() => setIsShowReply(!isShowReply)}
            style={{ zIndex: 10 }}
          >
            <Text className={`${textLight0Dark500} ml-12 text-10`}>
              {isShowReply ? "Hide replies..." : "Show replies..."}
            </Text>
          </TouchableOpacity>
        )}

        {isShowReply &&
          props.replieds.map((reply: CommentProps, index: number) => (
            <Comment
              key={index}
              {...reply}
              isReply={true}
              setReplyName={props.setReplyName}
              setReplyCommentId={props.setReplyCommentId}
              setTargetType={props.setTargetType}
              isLastComment={index === props.replieds.length - 1 ? true : false}
            />
          ))}
      </View>
    </View>
  );
};

export default Comment;
