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
import { getAPost } from "@/lib/post";
import { CommentProps, SocialPostProps } from "@/types/post";
import { deleteComment } from "@/lib/comment";
import ImageViewing from "react-native-image-viewing";
import GalleryPickerBox from "@/components/ui/GalleryPickerBox";
import SingleGalleryPickerBox from "@/components/ui/SingleGalleryPicker";
import ExpoCamera from "@/components/shared/multimedia/ExpoCamera";
import { useClickOutside } from "react-native-click-outside";
import AudioRecorder from "@/components/shared/multimedia/AudioRecorder";
import { ScreenRatio } from "@/utils/Device";
import { pickDocument, singlePickDocument } from "@/utils/DoucmentPicker";

const PostDetailPage = () => {
  const { postId } = useLocalSearchParams();

  const ref = useClickOutside<View>(() => setIsMicroOpen(false));

  const [post, setPost] = useState<SocialPostProps>();
  const router = useRouter();
  const navigation = useNavigation();
  const [replyName, setReplyName] = useState("");
  const [replyCommentId, setReplyCommentId] = useState("");
  const [targetType, setTargetType] = useState("post");

  const [isImageViewingOpen, setIsImageViewingOpen] = useState(false);
  const [viewingImage, setViewingImage] = useState("");

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isMicroOpen, setIsMicroOpen] = useState(false);

  const [selectedMedia, setSelectedMedia] = useState<{
    uri: string;
    type: string;
    name: string;
  }>();
  useEffect(() => {
    const getPostDetail = async () => {
      const result = await getAPost(postId.toString(), () =>
        router.push("/not-found")
      );
      console.log("detail post: ", result);
      setPost(result);
    };
    getPostDetail();
  }, []);

  const addCommentToPost = (newComment: CommentProps) => {
    setPost((prevPost) => {
      if (!prevPost) return prevPost;

      return {
        ...prevPost,
        comments: [...(prevPost.comments || []), newComment],
      };
    });
  };

  const handleDeleteComment = async (id: string) => {
    const deleteCommentRecursively = (
      comments: CommentProps[]
    ): CommentProps[] => {
      return comments
        .filter((comment) => comment._id !== id)
        .map((comment) => ({
          ...comment,
          replieds: deleteCommentRecursively(comment.replieds || []),
        }));
    };

    setPost((prevPost) => {
      if (!prevPost) return prevPost;

      return {
        ...prevPost,
        comments: deleteCommentRecursively(prevPost.comments || []),
      };
    });

    await deleteComment(id);
  };

  const addReplyToComment = (
    parentCommentId: string,
    newReply: CommentProps
  ) => {
    const addReplyRecursively = (comments: CommentProps[]): CommentProps[] => {
      return comments.map((comment) => {
        if (comment._id === parentCommentId) {
          return {
            ...comment,
            replieds: [...comment.replieds, newReply],
          };
        }

        if (comment.replieds && comment.replieds.length > 0) {
          return {
            ...comment,
            replieds: addReplyRecursively(comment.replieds),
          };
        }

        return comment;
      });
    };

    setPost((prevPost) => {
      if (!prevPost) return prevPost;

      return {
        ...prevPost,
        comments: addReplyRecursively(prevPost.comments),
      };
    });
  };

  const handleImageViewing = (uri: string) => {
    setViewingImage(uri);
    console.log("Viewing: ", uri);
    setIsImageViewingOpen(true);
  };

  const handleFilePicker = async () => {
    const file = await singlePickDocument();
    if (!file || Array.isArray(file)) {
      setSelectedMedia(undefined);
    } else {
      setSelectedMedia({
        uri: file.uri,
        type: file.type || "",
        name: file.name,
      });
    }
  };
  return (
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ paddingBottom: Platform.OS === "android" ? 0 : 10 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? (ScreenRatio >1.8? 56:14) : 0}
      >
        <View className={`flex-1 ${bgLight500Dark10}`}>
          {isImageViewingOpen ? (
            <ImageViewing
              images={[{ uri: viewingImage }]}
              imageIndex={0}
              visible={isImageViewingOpen}
              onRequestClose={() => setIsImageViewingOpen(false)}
              doubleTapToZoomEnabled={true}
            />
          ) : null}
          {isCameraOpen ? (
            <View className="fixed w-screen h-screen">
              <ExpoCamera
                onClose={() => setIsCameraOpen(false)}
                isSendNow={false}
                setSelectedMedia={(uri: string, type: string, name: string) =>
                  setSelectedMedia({ uri: uri, type: type, name: name })
                }
              />
            </View>
          ) : null}
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ rowGap: 20, paddingHorizontal: 10 }}
          >
            <View className="ml-[10px] mt-[10px]">
              <Previous navigation={navigation} isAbsolute={false} />
            </View>
            {post ? (
              <SocialPost
                {...post}
                isDetail={true}
                handleImageViewing={handleImageViewing}
                isDetailView={true}
              />
            ) : null}

            <Text
              className={`${textLight0Dark500} font-helvetica-light text-14`}
            >
              Comments
            </Text>
            <View className="px-[10px]">
              {post?.comments.map((item, index) => (
                <Comment
                  key={item._id}
                  {...item}
                  setReplyName={setReplyName}
                  replyName={replyName}
                  setReplyCommentId={setReplyCommentId}
                  setTargetType={setTargetType}
                  isLastComment={
                    index === post.comments.length - 1 ? true : false
                  }
                  handleDelete={handleDeleteComment}
                  handleImageViewing={handleImageViewing}
                />
              ))}
            </View>
          </ScrollView>
          {selectedMedia? (
            <View className="h-[100px]">
              <SingleGalleryPickerBox selectedMedia={selectedMedia} setSelectedMedia={setSelectedMedia}/>
            </View>
          ) : null}
          <CommentTyping
            replyId={replyName.length == 0 ? post?._id : replyCommentId}
            replyName={replyName}
            setReplyName={setReplyName}
            targetType={targetType}
            setTargetType={setTargetType}
            createNewComment={(newComment: CommentProps) =>
              replyName === ""
                ? addCommentToPost(newComment)
                : addReplyToComment(replyCommentId, newComment)
            }
            handleOpenCamera={() => setIsCameraOpen(true)}
            handleOpenMicro={() => setIsMicroOpen(true)}
            selectedMedia={selectedMedia}
            setSelectedMedia={setSelectedMedia}
            handleFilePicker={handleFilePicker}
          />
          {isMicroOpen ? (
            <View ref={ref}>
              <AudioRecorder
                setSelectedMedia={(uri, type, name) =>
                  setSelectedMedia({ uri: uri, type: type, name: name })
                }
              />
            </View>
          ) : null}
        </View>
      </KeyboardAvoidingView>
  );
};

export default PostDetailPage;
