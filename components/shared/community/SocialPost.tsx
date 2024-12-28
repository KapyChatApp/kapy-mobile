import { View, Text, Pressable, Image, Alert } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import UserAvatarLink from "@/components/ui/UserAvatarLink";
import { textLight0Dark500 } from "@/styles/theme";
import Love from "@/components/ui/Love";
import Share from "@/components/ui/Share";
import Comment from "@/components/ui/Comment";
import { useFocusEffect, useRouter } from "expo-router";
import { SocialPostProps } from "@/types/post";
import { formatDate, formatDateDistance } from "@/utils/DateFormatter";
import { Video } from "expo-av";
import { deletePost, disLike, like } from "@/lib/post";
import { getLocalAuth } from "@/lib/local";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as Sharing from "expo-sharing";
import VideoPlayer from "../multimedia/VideoPlayer";
import AudioPlayer from "../multimedia/AudioPlayer";
import PostAudioPlayer from "../multimedia/PostAudioPlayer";
import File from "@/components/ui/File";
import { FileProps } from "@/types/file";
import MediaGroup from "@/components/ui/MediaGroup";
const SocialPost = (props: SocialPostProps) => {
  const [isShowComment, setIsShowComment] = useState(false);
  const router = useRouter();
  const [totalLike, setTotalLike] = useState(props.likedIds.length);
  const [totalComment, setTotalComment] = useState(props.comments.length);
  const [totalShare, setTotalShare] = useState(props.shares.length);
  const { showActionSheetWithOptions } = useActionSheet();
  const [userId, setUserId] = useState("");
  const [isLiked, setIsliked] = useState(
    props.likedIds.includes(userId.toString()) ? true : false
  );
  const isMyPost = props.userId.toString() === userId;
  const [videoImages, setVideoImages] = useState<FileProps[]>([]);
  const [otherMedias, setOtherMedias] = useState<FileProps[]>([]);
  useFocusEffect(
    useCallback(() => {
      const handleDisPlayPost = () => {
        const videoImages = props.contents.filter(
          (item) => item.type === "Image" || item.type === "Video"
        );
        const otherMedias = props.contents.filter(
          (item) => item.type !== "Video" && item.type !== "Image"
        );
        console.log("display item: ", videoImages);
        setVideoImages(videoImages);
        setOtherMedias(otherMedias);
      };
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
      handleDisPlayPost();
      likeStreamManage();
    }, [])
  );

  const handleLikeFunction = async () => {
    console.log(isLiked);
    if (isLiked) {
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
    const options = isMyPost
      ? ["Delete the post", "Edit the post", "Cancel"]
      : ["Report this port", "Cancel"];
    const cancelButtonIndex = isMyPost ? 2 : 1;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex: number | undefined) => {
        switch (selectedIndex) {
          case 0:
            if (isMyPost) {
              handleDeletePost();
            } else {
              router.push({
                pathname: "/report",
                params: { targetId: props._id, targetType: "Post" },
              });
            }
            break;
          case 1:
            router.push({
              pathname: "/community/edit-post",
              params: { postId: props._id },
            });
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
      onLongPress={handleLongPress}
    >
      <View className="flex flex-row" style={{ columnGap: 8 }}>
        <UserAvatarLink
          avatarURL={{ uri: props.avatar }}
          userId={props.userId}
          size={59}
        />
        <View className="flex pt-[8px]" style={{ rowGap: 6 }}>
          <Text className={`${textLight0Dark500} font-helvetica-bold text-14`}>
            {props.firstName + " " + props.lastName}
          </Text>
          <Text className="text-dark-330 dark:text-dark-320 font-helvetica-light text-10">
            {formatDateDistance(props.createAt)}
          </Text>
        </View>
      </View>
      <View className="flex" style={{ rowGap: 10 }}>
        <Text className={`${textLight0Dark500} font-helvetica-light text-14`}>
          {props.caption}
        </Text>
        <MediaGroup medias={videoImages} />
        {otherMedias.map(
          (item) =>
            // item.type === "Video" ? (
            //   <VideoPlayer videoSource={item.url!}/>
            // ) : item.type === "Image" ? (
            //   <View className="z-10">
            //   <Pressable className="w-fit h-fit" onPress={()=>props.handleImageViewing?.(item.url!)}>
            //   <Image
            //     source={{ uri: item.url }}
            //     style={{
            //       width: "auto",
            //       height: "auto",
            //       borderRadius: 10,
            //       marginBottom: 10,
            //       aspectRatio: Number(item.width) / Number(item.height),
            //     }}
            //     resizeMode="cover"
            //   />
            //   </Pressable>
            //   </View>
            // ) : (
            item.type === "Audio" ? (
              <PostAudioPlayer audioUri={item.url!} />
            ) : (
              <File file={item} isSender={false} position="free" />
            )
          // )
        )}
      </View>
      <View
        className="flex flex-row absolute -bottom-[14px] left-[20px]"
        style={{ columnGap: 8 }}
      >
        <Love
          totalLike={totalLike}
          onPress={handleLikeFunction}
          isLoved={isLiked}
        />
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
