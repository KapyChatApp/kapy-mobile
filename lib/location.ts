import { LocationProps } from "@/types/location";
import { getLocalAuth } from "./local";
import axios from "axios";

export const updateLocation = async (location: LocationProps) => {
  try {
    const { token } = await getLocalAuth();
    const response = await axios.patch(
      process.env.EXPO_PUBLIC_BASE_URL + "/location/update",
      location,
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
