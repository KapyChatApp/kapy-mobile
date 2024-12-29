import { generateRandomNumberString } from "@/utils/Random";
import axios from "axios";
import { Alert } from "react-native";
import { getLocalAuth } from "./local";

export const createComment = async (
  caption: string,
  selectedMedia: { uri: string; type: string; name: string } | null,
  goOn: () => void,
  replyId: string | undefined,
  targetType: string
) => {
  try {
    const { token } = await getLocalAuth();

    const formData = new FormData();

    formData.append("caption", caption);

    const newFile: any = {
      uri: selectedMedia?.uri,
      type:
        selectedMedia?.type === "image" ? "image/jpeg" : selectedMedia?.type,
      name: selectedMedia?.name,
    };

    formData.append("file", newFile as any);

    const response = await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/post/comment/add",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`,
        },
        params: {
          replyId: replyId,
          targetType: targetType,
        },
      }
    );
    goOn();
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

export const editComment = async (
  commentId: string,
  caption: string,
  keepOldContent: boolean,
  selectedMedia: { uri: string; type: string; name: string }
) => {
  try {
    const { token } = await getLocalAuth();
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("keepOldContent", keepOldContent as any);
    formData.append("file", selectedMedia as any);
    const response = await axios.patch(
      process.env.EXPO_PUBLIC_BASE_URL + "/comment/edit",
      formData,
      {
        headers: {
          "Content-Type": "multipart/formdata",
          Authorization: `${token}`,
        },
        params: { commentId: commentId },
      }
    );
    if (response.status === 200 || response.status === 201) {
      Alert.alert("Updated!");
      return response.data;
    } else {
      Alert.alert("Cannot update now!");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const likeComment = async (commentId: string) => {
  try {
    const { token } = await getLocalAuth();

    const response = axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/post/comment/like",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        params: { commentId: commentId },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const disLikeComment = async (commentId: string) => {
  try {
    const { token } = await getLocalAuth();

    const response = axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/post/comment/dislike",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        params: { commentId: commentId },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const { token } = await getLocalAuth();
    const response = await axios.delete(
      process.env.EXPO_PUBLIC_BASE_URL + "/post/comment/delete",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        params: { commentId: commentId },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
