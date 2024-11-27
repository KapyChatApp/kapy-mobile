import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocalAuth } from "./local-auth";
import { Alert } from "react-native";
import { generateRandomNumberString } from "@/utils/Random";

export const getAPost = async (postId:string, goOn:()=>void)=>{
  try{
    const {token} = await getLocalAuth();
    
    const response = await axios.get( process.env.EXPO_PUBLIC_BASE_URL + "/post/apost",{
      headers:{
        "Content-Type": "application/json",
        Authorization: `${token}`
      },
      params:{
        postId: postId
      }
    }); 
    console.log("data ",  response.data);
    if(!response.data){
      goOn();
    }
    return response.data;
  }catch(error){
    console.log(error);
    goOn();
    throw error;
  }
}

export const getMyPosts = async (goOn:()=>void) => {
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
    console.log("postData: ",response.data)
    goOn();
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getFriendPosts = async (friendId: string) => {
  try {
    const { token } = await getLocalAuth();
    console.log("requireId", friendId);
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
    if (!response.data) {
      console.log(response.status);
      throw new Error("Not found posts");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createPost = async (
  caption: string,
  selectedMedia: { uri: string; type: string }[],
  goOn: () => void
) => {
  try {
    const { token } = await getLocalAuth();

    const formData = new FormData();

    formData.append("caption", caption);

    selectedMedia.forEach((media, index) => {
      const newFile: any = {
        uri: media.uri,
        type: media.type === "image" ? "image/jpeg" : media.type,
        name: generateRandomNumberString(10)?.toString(),
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

export const deletePost = async (postId:string, goOn:()=>void)=>{
  try{
    const {token} = await getLocalAuth();
    
    const response = await axios.delete(process.env.EXPO_PUBLIC_BASE_URL + "/post/delete",{
      headers:{
        "Content-Type":"application/json",
        Authorization:`${token}`
      },
      params:{postId:postId}
    });

    if(response.status ==200){
      goOn();
    }
    else{
    Alert.alert('Cannot delete the post now!');}
  }catch(error){
    console.log(error);
    throw error;
  }
}
export const like = async (postId: string) => {
  try {
    const { token } = await getLocalAuth();
    const response = await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/post/like",{},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        params:{
          postId:postId
        }
      }
    );
    if (response.status != 200) {
      Alert.alert('Cannot like now!');
    }
  } catch (error) {
    console.log("Error like: ", error);
    throw error;
  }
};

export const disLike = async  (postId: string) => {
  try {
    const { token } = await getLocalAuth();
    const response = await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/post/dislike",{},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        params:{
          postId:postId
        }
      }
    );
    if (response.status != 200) {
      Alert.alert('Cannot dislike now');
    }
  } catch (error) {
    console.log("Error like: ", error);
    throw error;
  }
};