import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocalAuth } from "./local";
import { Alert } from "react-native";
import { generateRandomNumberString } from "@/utils/Random";
import { MusicTrack } from "@/types/music";

export const getAPost = async (postId: string, goOn: () => void) => {
  try {
    const { token } = await getLocalAuth();

    const response = await axios.get(
      process.env.EXPO_PUBLIC_BASE_URL + "/post/apost",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        params: {
          postId: postId,
        },
      }
    );
    console.log("data ", response.data);
    if (!response.data) {
      goOn();
    }
    return response.data;
  } catch (error) {
    console.log(error);
    goOn();
    throw error;
  }
};

export const getMyPosts = async (goOn: () => void) => {
  try {
    const { token } = await getLocalAuth();

    const response = await axios.get(
      process.env.EXPO_PUBLIC_BASE_URL + "/mine/post",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    if (!response.data) {
      throw new Error("Not found your posts");
    }
    const safePost = response.data.filter((item: any) => item.flag !== false);
    console.log("safe-post: ", safePost);
    goOn();
    return safePost;
  } catch (error) {
    return [];
  }
};

export const getFriendPosts = async (friendId: string) => {
  try {
    const { token } = await getLocalAuth();
    const response = await axios.get(
      process.env.EXPO_PUBLIC_BASE_URL + "/post/friend",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        params: { friendId: friendId },
      }
    );
    if (response.status === 200 || response.status === 201) {
      const safePost = response.data.filter((item: any) => item.flag !== false);
      return safePost;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createPost = async (
  caption: string,
  selectedMedia: { uri: string; type: string; name: string }[],
  tagIds: string[] | null,
  selectedMusic: MusicTrack | null,
  goOn: () => void
) => {
  try {
    const { token } = await getLocalAuth();

    const formData = new FormData();

    formData.append("caption", caption);
    if (tagIds && tagIds.length != 0) {
      formData.append("tagIds", JSON.stringify(tagIds));
    }
    if (selectedMusic) {
      formData.append("musicName", selectedMusic?.trackName);
      formData.append("musicAuthor", selectedMusic?.artistName);
      formData.append("musicImageURL", selectedMusic?.artworkUrl100);
      formData.append("musicURL", selectedMusic.previewUrl);
    }

    selectedMedia.forEach((media, index) => {
      const newFile: any = {
        uri: media.uri,
        type: "image/jpeg",
        name: media.name,
      };
      formData.append("file", newFile as any);
    });
    const response = await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/post/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Post created successfully", response.data);
      goOn();
    } else {
      Alert.alert("Failed: " + response.status);
    }
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const deletePost = async (postId: string, goOn: () => void) => {
  try {
    const { token } = await getLocalAuth();

    const response = await axios.delete(
      process.env.EXPO_PUBLIC_BASE_URL + "/post/delete",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        params: { postId: postId },
      }
    );

    if (response.status == 200) {
      goOn();
    } else {
      Alert.alert("Cannot delete the post now!");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const like = async (postId: string) => {
  try {
    const { token } = await getLocalAuth();
    const response = await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/post/like",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        params: {
          postId: postId,
        },
      }
    );
    if (response.status != 200) {
      Alert.alert("Cannot like now!");
    }
  } catch (error) {
    console.log("Error like: ", error);
    throw error;
  }
};

export const disLike = async (postId: string) => {
  try {
    const { token } = await getLocalAuth();
    const response = await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/post/dislike",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        params: {
          postId: postId,
        },
      }
    );
    if (response.status != 200) {
      Alert.alert("Cannot dislike now");
    }
  } catch (error) {
    console.log("Error like: ", error);
    throw error;
  }
};

export const editPost = async (
  postId: string,
  caption: string,
  selectedMedias: {
    uri: string;
    type: string;
    name: string | null | undefined;
  }[],
  remainMediaIds: string[],
  tagIds: string[] | undefined,
  musicName: string |undefined,
  musicURL: string |undefined,
  musicAuthor: string |undefined,
  musicImageURL: string |undefined,
  goOn:()=>void
) => {
  try {
    const { token } = await getLocalAuth();
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("remainContentIds", JSON.stringify(remainMediaIds));
    formData.append("tagIds",JSON.stringify(tagIds? tagIds :[]));
    formData.append("musicName", musicName? musicName:"");
    formData.append("musicURL", musicURL? musicURL:"");
    formData.append("musicAuthor", musicAuthor? musicAuthor:"");
    formData.append("musicImageURL", musicImageURL? musicImageURL:"");
    selectedMedias.forEach((media) => {
      formData.append("file", {
        uri: media.uri,
        type: media.type,
        name: media.name,
      } as any);
    });

    const response = await axios.patch(
      process.env.EXPO_PUBLIC_BASE_URL + "/post/edit",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`,
        },
        params: { postId: postId },
      }
    );
    if (response.status === 200 || response.status == 201) {
      Alert.alert(
        "Edited!",
        "Your post has been successfully edited.",
        [
          {
            text: "OK",
            onPress: () => {
              goOn();
            },
          },
        ],
        { cancelable: false }
      );
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
