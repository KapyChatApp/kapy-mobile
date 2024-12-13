import { generateRandomNumberString } from "@/utils/Random";
import axios from "axios";
import { Alert } from "react-native";
import { getLocalAuth } from "./local-auth";

export const createComment = async (
  caption: string,
  selectedMedia: { uri: string; type: string } | null,
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
      name: generateRandomNumberString(10)?.toString(),
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

export const likeComment = async (commentId: string) => {
  try {
    const { token } = await getLocalAuth();

    const response = axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/post/comment/like",{},
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
      process.env.EXPO_PUBLIC_BASE_URL + "/post/comment/dislike",{},
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
