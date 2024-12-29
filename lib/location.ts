import { LocationProps } from "@/types/location";
import { getLocalAuth } from "./local";
import axios from "axios";
import * as Location from "expo-location";

export const getCountryInfo = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Permission to access location was denied.");
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    const [geoData] = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (geoData && geoData.country) {
      return geoData.country; 
    } else {
      throw new Error("Unable to fetch country.");
    }
  } catch (error) {
    console.error(error);
    return "Unknown"; 
  }
};
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
