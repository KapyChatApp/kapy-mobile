import axios from "axios";
import { getLocalAuth } from "./local-auth";
import { CreateChatBoxProps, MessageProps } from "@/types/message";
import { generateRandomNumberString } from "@/utils/Random";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { prepareFileForUpload } from "@/utils/File";
export const getMyChatBoxes = async () => {
  try {
    const { token } = await getLocalAuth();
    const boxChats = await axios.get(
      process.env.EXPO_PUBLIC_BASE_URL + "/message/all-box-chat",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    const groupChats = await axios.get(
      process.env.EXPO_PUBLIC_BASE_URL + "/message/all-box-group",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    const boxData = Array.isArray(boxChats.data.box) ? boxChats.data.box : [];
    const groupData = Array.isArray(groupChats.data.box) ? groupChats.data.box : [];
    const data =  [...boxData,...groupData
    ];
    await AsyncStorage.setItem("ChatBoxes",JSON.stringify(data));
    for(const box of data){
      await AsyncStorage.setItem(`box-${box._id}`,JSON.stringify(box));
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAMessageBox = async (boxId: string | string[]) => {
  try {
    const { token } = await getLocalAuth();
    const response = await axios.get(
      process.env.EXPO_PUBLIC_BASE_URL + "/message/get-info-box-chat",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        params: { boxId: boxId },
      }
    );
    return response.data.box ? response.data.box : null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getAllMessages = async (boxId: string | string[]) => {
  try {
    const { token } = await getLocalAuth();

    const response = await axios.get(
      process.env.EXPO_PUBLIC_BASE_URL + "/message/all",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        params: { boxId: boxId },
      }
    );

    return response.data.messages ? response.data.messages : null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createGroup = async (
  memberIds: string[],  
  groupName:string,
  groupAva:{uri:string, type:string, name:string| null|undefined},
  goOn: (boxId: string) => void
) => {
  try {
    const { token } = await getLocalAuth();
    const formData = new FormData();
    console.log("membersIds: ",memberIds);
    formData.append("membersIds",JSON.stringify(memberIds));
    formData.append("groupName",groupName);
    if(groupAva){
      formData.append("file",groupAva as any);
    }
    const response = await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/message/create-group",
      formData,
      {
        headers: {
          "Content-Type": "multipart/formdata",
          Authorization: `${token}`,
        },
      }
    );
    if (response.data) {
      setTimeout(() => goOn(response.data._id), 300);
    }
    return response.data ? response.data : null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const markRead = async (boxId: string) => {
  try {
    const { token } = await getLocalAuth();
    const response = await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/message/mark-read",
      { boxId: boxId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const revokeMessage = async (messageId: string) => {
  try {
    const { token } = await getLocalAuth();
    const response = await axios.delete(
      process.env.EXPO_PUBLIC_BASE_URL + "/message/revoke",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        params: { messageId: messageId },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMessage = async (messageId: string) => {
  try {
    const { token } = await getLocalAuth();
    console.log("Deleting: ", messageId);
    const response = await axios.delete(
      process.env.EXPO_PUBLIC_BASE_URL + "/message/delete",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        params: { messageId: messageId },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const sendMessage = async (
  boxId: string,
  content: string,
  files: { uri: string; type: string; name: string | undefined | null }[],
  goOn:(status:string)=>void
) => {
  try {
    const { token } = await getLocalAuth();
    console.log("files: ", files);
    if (files.length != 0) {
      for (const file of files) {
        const formData = new FormData();
        const fileContent: any = {
          fileName: file.name,
          url: "",
          publicId: "",
          bytes: "",
          width: "0",
          height: "0",
          format: file.name?.split(".").pop(),
          type: file.type,
        };
        let newFile = null;
        if (
          file.type === "image" ||
          file.type === "video" ||
          file.type === "audio"
        ) {
          newFile = {
            uri: file.uri,
            type: "image/jpeg",
            name: file.name,
          };
        } else {
          console.log("type: ", file.name?.split(".").pop());
          const tempUri = await prepareFileForUpload(file.uri, file.name!);
          console.log("prepare uri: ", tempUri);
          newFile = {
            uri: tempUri,
            type: file.name?.split(".").pop(),
            name: file.name,
          };
        }
        formData.append("boxId", boxId);
        formData.append("content", JSON.stringify(fileContent));
        formData.append("file", newFile as any);
        await axios.post(
          process.env.EXPO_PUBLIC_BASE_URL + "/message/send",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${token}`,
            },
          }
        );
      }
    } else {
      const formData = new FormData();
      formData.append("boxId", boxId);
      formData.append("content", `"${content}"`);
      const response = await axios.post(
        process.env.EXPO_PUBLIC_BASE_URL + "/message/send",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${token}`,
          },
        }
      );
      if(response.status === 200 || response.status===201){
        goOn("success");
        const timer = setTimeout(()=>goOn("non-send"),2000);
        return clearTimeout(timer);
      }
      else{
        goOn("fail");
        const timer = setTimeout(()=>goOn("non-send"),2000);
        return clearTimeout(timer);
      }
    }
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const addToMessageLocal = async (boxId:string,message:MessageProps)=>{
  try{
    const localMessages = await AsyncStorage.getItem(`messages-${boxId}`);
    const messages = await JSON.parse(localMessages!);
    messages.push(message);
    await AsyncStorage.setItem(`messages-${boxId}`,JSON.stringify(messages));
  }catch(error){
    console.log(error);
    throw error;
  }
}

export const texting = async (boxId: string) => {
  try {
    const { token } = await getLocalAuth();
    const user = await AsyncStorage.getItem("user");
    const avatar = JSON.parse(user!).avatar;
    const response = await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/message/texting",
      { boxId: boxId, avatar: avatar ? avatar : "" },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const disableTexting = async (boxId: string) => {
  try {
    const { token } = await getLocalAuth();
    const user = await AsyncStorage.getItem("user");
    const avatar = JSON.parse(user!).avatar;
    const response = await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/message/disable-texting",
      { boxId: boxId, avatar: avatar ? avatar : "" },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const react = async (messageId: string) => {
  try {
    const { token } = await getLocalAuth();
    await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/message/react",
      { messageId: messageId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};
