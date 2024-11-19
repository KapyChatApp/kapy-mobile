import axios from "axios";
import { getLocalAuth } from "./local-auth";
import { CreateChatBoxProps, CreateMessageData } from "@/types/message";

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
    return response.data ? response.data : null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAMessageBox = async (boxId: string | string[]) => {
  try {
    const { token } = await getLocalAuth();
    const response = await axios.get(
      process.env.EXPO_PUBLIC_BASE_URL + "/message/a-messagebox",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        params: { boxId: boxId },
      }
    );
    return response.data ? response.data : null;
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

    return response.data ? response.data : null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createGroup = async (memberIds: string[], leaderId: string) => {
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
    return response.data ? response.data : null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const sendMessage = async (
  userId: string,
  groupId: string,
  recipientId?: string,
  content?: string
) => {
  try {
    const { token } = await getLocalAuth();
    const formData = new FormData();
    const textContent:string[] = [content || ""]
    formData.append("userId", userId);
    formData.append("groupId", groupId);
    formData.append("content", `"${content}"`);
    formData.append("recipientId", recipientId || "");

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

    console.log("Response from API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
