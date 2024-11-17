import { View, Text, Pressable, Image, Alert } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import UserAvatarLink from "@/components/ui/UserAvatarLink";
import { textLight0Dark500 } from "@/styles/theme";
import Love from "@/components/ui/Love";
import Share from "@/components/ui/Share";
import Comment from "@/components/ui/Comment";
import { useFocusEffect, useRouter } from "expo-router";
import { SocialPostProps } from "@/types/post";
import { formatDate } from "@/utils/DateFormatter";
import { Video } from "expo-av";
import { deletePost, disLike, like } from "@/requests/post";
import { getLocalAuth } from "@/requests/local-auth";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as Sharing from "expo-sharing";
const SocialPost = (props: SocialPostProps) => {
  const [isShowComment, setIsShowComment] = useState(false);
  const router = useRouter();
  const [totalLike, setTotalLike] = useState(props.likedIds.length);
  const [totalComment, setTotalComment] = useState(props.comments.length);
  const [totalShare, setTotalShare] = useState(props.shares.length);
  const { showActionSheetWithOptions } = useActionSheet();
  const [userId, setUserId] = useState("");
  const [liked, setIsliked] = useState(
    props.likedIds.includes(userId.toString()) ? true : false
  );
  useFocusEffect(
    useCallback(() => {
      console.log(props.contents);
      const likeStreamManage = async () => {
        const { _id } = await getLocalAuth();
        setUserId(_id);
        const userIdString = _id.toString();
        if (props.likedIds.map((id) => id.toString()).includes(userIdString)) {
          setIsliked(true);
        } else {
          setIsliked(false);
        }
      };
      likeStreamManage();
    }, [])
  );

  const handleLikeFunction = async () => {
    console.log(liked);
    if (liked) {
      setTotalLike(totalLike - 1);
      setIsliked(false);
      await disLike(props._id);
    } else {
      setTotalLike(totalLike + 1);
      setIsliked(true);
      await like(props._id);
    }
  };

  const handleDeletePost = async () => {
    await deletePost(props._id, () => Alert.alert("Deleted"));
  };
  const handleLongPress = async () => {
    const options =
      props.userId.toString() === userId
        ? ["Delete the post", "Edit the post", "Cancel"]
        : ["Report this port", "Cancel"];
    const cancelButtonIndex = props.userId.toString() === userId ? 2 : 1;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex: number | undefined) => {
        switch (selectedIndex) {
          case 0:
            handleDeletePost();
            break;
          case 1:
            break;

          case cancelButtonIndex:
        }
      }
    );
  };
  return (
    <Pressable
      className="flex border border-border rounded-3xl p-[16px] w-full pb-[50px]"
      style={{ rowGap: 8 }}
      pointerEvents="box-none"
      onLongPress={handleLongPress}
    >
      <View className="flex flex-row" style={{ columnGap: 8 }}>
        <UserAvatarLink
          avatarURL={{ uri: props.avatar }}
          userId={props.userId}
          size={59}
        />
        <View className="flex pt-[8px]" style={{ rowGap: 6 }}>
          <Text className={`${textLight0Dark500} font-helvetica-bold text-16`}>
            {props.firstName + " " + props.lastName}
          </Text>
          <Text className="text-dark-330 font-helvetica-light text-10">
            {formatDate(props.createAt)}
          </Text>
        </View>
      </View>
      <View className="flex" style={{ rowGap: 10 }}>
        <Text className={`${textLight0Dark500} font-helvetica-light text-14`}>
          {props.caption}
        </Text>
        {props.contents.map((item) =>
          item.type === "Video" ? (
            <Video
              source={{ uri: item.url }}
              style={{
                width: "auto",
                height: "auto",
                borderRadius: 10,
                marginBottom: 10,
                aspectRatio: Number(item.width) / Number(item.height),
              }}
              shouldPlay={false}
              isLooping={false}
              useNativeControls
            />
          ) : item.type === "Image" ? (
            <Image
              source={{ uri: item.url }}
              style={{
                width: "auto",
                height: "auto",
                borderRadius: 10,
                marginBottom: 10,
                aspectRatio: Number(item.width) / Number(item.height),
              }}
              resizeMode="cover"
            />
          ) : null
        )}
      </View>
      <View
        className="flex flex-row absolute -bottom-[14px] left-[20px]"
        style={{ columnGap: 8 }}
      >
        <Love totalLike={totalLike} onPress={handleLikeFunction} />
        <Comment
          totalComment={totalComment}
          onPress={
            props.isDetail
              ? null
              : () =>
                  router.push({
                    pathname: "/community/post-detail/[postId]",
                    params: { postId: props._id },
                  })
          }
        />
        <Share totalShare={0} onPress={() => {}} />
      </View>
    </Pressable>
  );
};

export default SocialPost;
