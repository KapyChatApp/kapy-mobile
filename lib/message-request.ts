import axios from "axios";
import { getLocalAuth } from "./local-auth";
import { CreateChatBoxProps, CreateMessageData } from "@/types/message";
import { FileProps } from "@/types/file";
import { generateRandomNumberString } from "@/utils/Random";

export const getMyChatBoxes = async () => {
  try {
    const { token } = await getLocalAuth();
    const response = await axios.get(
      process.env.EXPO_PUBLIC_BASE_URL + "/message/all-box-chat",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    return response.data.box ? response.data.box : null;
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
  leaderId: string,
  goOn: (boxId: string) => void
) => {
  try {
    const { token } = await getLocalAuth();
    const requestBody: CreateChatBoxProps = {
      membersIds: memberIds,
      leaderId: leaderId,
    };
    const response = await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/message/create-group",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    if (response.data) {
      setTimeout(()=>goOn(response.data._id),300)
    }
    return response.data ? response.data : null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const sendMessage = async (boxId: string, content: string, files:{uri:string, type:string}[]) => {
  try {
    const { token } = await getLocalAuth();
   
    if(files.length!=0){
      for(const file of files){
        const formData = new FormData();
        const newFile: any = {
          uri: file.uri,
          type: file.type === "image" ? "image/jpeg" : file.type,
          name: generateRandomNumberString(10)?.toString(),
        };
  
        formData.append("boxId",boxId);
        formData.append("content","");
        formData.append("file", newFile as any);
        await axios.post(
          process.env.EXPO_PUBLIC_BASE_URL + "/message/send-mobile",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${token}`,
            },
          }
        );
      }
   
    } else{
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
  
      return response.data;
    }

   
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const markRead = async (boxId: string) => {
  try {
    const { token } = await getLocalAuth();
    const response = await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/message/mark-read",
      { boxId: boxId},
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
