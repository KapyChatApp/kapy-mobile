import axios from "axios";
import { getLocalAuth } from "./local-auth";

export const allImagesOfMessageBox = async (boxId: string) => {
  try {
    const { token } = await getLocalAuth();
    const response = await axios.get(
      process.env.EXPO_PUBLIC_BASE_URL + "/message/get-list/images",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        params: { boxId: boxId },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const allVideosOfMessageBox = async (boxId: string) => {
  try {
    const { token } = await getLocalAuth();
    const response = await axios.get(
      process.env.EXPO_PUBLIC_BASE_URL + "/message/get-list/videos",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        params: { boxId: boxId },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const allAudiosOfMessageBox = async (boxId: string) => {
    try {
      const { token } = await getLocalAuth();
      const response = await axios.get(
        process.env.EXPO_PUBLIC_BASE_URL + "/message/get-list/audios",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          params: { boxId: boxId },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  

export const allFilesOfMessageBox = async (boxId: string) => {
  try {
    const { token } = await getLocalAuth();
    const response = await axios.get(
      process.env.EXPO_PUBLIC_BASE_URL + "/message/get-list/others",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        params: { boxId: boxId },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
