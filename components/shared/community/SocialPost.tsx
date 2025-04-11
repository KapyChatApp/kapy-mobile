import { View, Text, Pressable, Image, Alert } from "react-native";
import * as Linking from "expo-linking";
import React, { useCallback, useEffect, useRef, useState } from "react";
import UserAvatarLink from "@/components/ui/UserAvatarLink";
import { textLight0Dark500 } from "@/styles/theme";
import Love from "@/components/ui/Love";
import Share from "@/components/ui/Share";
import Comment from "@/components/ui/Comment";
import { useFocusEffect, useRouter } from "expo-router";
import { SocialPostProps } from "@/types/post";
import { formatDate, formatDateDistance } from "@/utils/DateFormatter";
import { Audio, Video } from "expo-av";
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
import { hasLink } from "@/utils/Link";
import MiniMusicBox from "./MiniMusicBox";
import FriendLinkName from "../friend/FriendLinkName";
const SocialPost = (props: SocialPostProps) => {
  const [isShowComment, setIsShowComment] = useState(false);
  const [post, setPost] = useState<SocialPostProps>();
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

  const soundRef = useRef<Audio.Sound | null>(null);

  const highlightLinks = (message: string) => {
    const parts = message.split(/(\b(?:https?:\/\/|www\.)[^\s]+\b)/g); // Tách văn bản tại các URL
    return parts.map((part, index) => {
      if (hasLink(part)) {
        const formattedLink =
          part.startsWith("http://") || part.startsWith("https://")
            ? part
            : `https://${part}`;

        return (
          <Text
            key={index}
            className="font-helvetica-bold underline"
            onPress={() =>
              Linking.openURL(formattedLink).catch((err) =>
                console.warn("Error opening link:", err)
              )
            }
          >
            {part}
          </Text>
        );
      }
      return <Text key={index}>{part}</Text>;
    });
  };

  useFocusEffect(
    useCallback(() => {
      setPost(props);
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
    }, [props])
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
  const handleShare = async () => {
    try {
      if (post?.contents && post?.contents.length != 0) {
        for (const content of post.contents) {
          await Sharing.shareAsync(content.url!, {
            dialogTitle: "Share this post",
          });
        }
      }
    } catch (error) {
      console.error("Error sharing post: ", error);
    }
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

  useEffect(() => {
    const loadAndPlaySound = async () => {
      if (props.musicURL) {
        try {
          const { sound } = await Audio.Sound.createAsync(
            { uri: props.musicURL },
            { shouldPlay: true }
          );
          soundRef.current = sound;
        } catch (error) {
          console.error("Error when playing music", error);
        }
      }
    };
    if (props.isDetailView && props.musicURL && props.musicURL !== "") {
      loadAndPlaySound();
    }

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    };
  }, [props.musicURL]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (soundRef.current) {
          soundRef.current.stopAsync();
          soundRef.current.unloadAsync();
          soundRef.current = null;
        }
      };
    }, [])
  );
  return (
    <Pressable
      className="flex border border-border rounded-3xl p-[16px] w-full pb-[50px]"
      style={{ rowGap: 8 }}
      onLongPress={handleLongPress}
      onPress={() => {
        if (!props.isDetailView) {
          router.push({
            pathname: "/community/post-detail/[postId]",
            params: { postId: props._id },
          });
        }
      }}
    >
      <View
        className="flex flex-row items-center justify-between"
        style={{ columnGap: 10 }}
      >
        <View className="flex flex-row" style={{ columnGap: 8 }}>
          <UserAvatarLink
            avatarURL={{ uri: props.avatar }}
            userId={props.userId}
            size={59}
          />
          <View className="flex pt-[8px]" style={{ rowGap: 6 }}>
            <Text
              className={`${textLight0Dark500} font-helvetica-bold text-14`}
            >
              {props.firstName + " " + props.lastName}
            </Text>
            <Text className="text-dark-330 dark:text-dark-320 font-helvetica-light text-10">
              {formatDateDistance(props.createAt)}
            </Text>
          </View>
        </View>

        {props.musicURL ? (
          <MiniMusicBox
            albumName=""
            trackName={props.musicName!}
            trackId={1}
            artistName={props.musicAuthor!}
            previewUrl={props.musicURL}
            artworkUrl100={props.musicImageURL!}
            trackPrice={1}
            currency=""
            releaseDate=""
            genre=""
          />
        ) : null}
      </View>

      <View className="flex" style={{ rowGap: 10 }}>
        <View
          className="flex flex-row flex-wrap
        "
        >
          {props.tags.map((item, index) => (
            <FriendLinkName
              key={index}
              _id={item._id}
              fullName={
                index === props.tags.length - 1
                  ? item.firstName + " " + item.lastName
                  : item.firstName + " " + item.lastName + ", "
              }
              fontSize={12}
            />
          ))}
        </View>
        <Text className={`${textLight0Dark500} font-helvetica-light text-14`}>
          {highlightLinks(props.caption)}
        </Text>
        <MediaGroup medias={videoImages} />
        {otherMedias.map(
          (item) =>
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
        <Share totalShare={0} onPress={handleShare} />
      </View>
    </Pressable>
  );
};

export default SocialPost;
