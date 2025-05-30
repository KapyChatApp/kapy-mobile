import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getMyProfile } from "./my-profile";
import { getAllMessages, getMyChatBoxes, getMyGroups } from "./message";
import { getMyMapStatus } from "./map";
import { getMyFriends } from "./my-friends";
import * as Device from "expo-device";
import { getCountryInfo } from "./location";
import { Platform } from "react-native";
import * as Notifications from 'expo-notifications';

export const getDeviceInfo = async () => {
  try {
    const deviceType = Device.deviceType;

    let deviceTypeString = "UNKNOWN";

    switch (deviceType) {
      case Device.DeviceType.PHONE:
        deviceTypeString = "PHONE";
        break;
      case Device.DeviceType.TABLET:
        deviceTypeString = "TABLET";
        break;
      case Device.DeviceType.DESKTOP:
        deviceTypeString = "DESKTOP";
        break;
      case Device.DeviceType.TV:
        deviceTypeString = "TV";
        break;
      case Device.DeviceType.UNKNOWN:
        deviceTypeString = "UNKNOWN";
        break;
      default:
        deviceTypeString = "UNKNOWN";
    }
    return {
      deviceName: Device.deviceName,
      deviceType: deviceTypeString,
      modelName: Device.modelName,
      brand: Device.brand,
      osName: Device.osName,
      osVersion: Device.osVersion,
      region: await getCountryInfo(),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getLocalAuth = async () => {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    throw new Error("You are unauthenticated!");
  }
  const user = await AsyncStorage.getItem("user");
  if (!user) {
    throw new Error("User not found!");
  }
  const { _id } = JSON.parse(user);
  return { token, _id };
};

export const checkIn = async () => {
  try {
    console.log("checked-in");
    const { token } = await getLocalAuth();
    await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/user/online",
      {},
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

export const checkOut = async () => {
  try {
    console.log("checked-out");
    const { token } = await getLocalAuth();
    await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/user/offline",
      {},
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

export const synchronizeData = async (
  startLoading?: () => void,
  endLoading?: () => void
) => {
  try {
    startLoading?.();
    await getMyProfile();
    const boxes = await getMyChatBoxes();
    for (const box of boxes) {
      const messages = await getAllMessages(box._id);
      await AsyncStorage.setItem(
        `messages-${box._id}`,
        JSON.stringify(messages)
      );
      for (const member of box.receiverIds) {
        AsyncStorage.setItem(`user-${member._id}`, JSON.stringify(member));
      }
    }
    await getMyGroups();
    await getMyFriends();
    const myMapStatus = await getMyMapStatus();
    await AsyncStorage.setItem(`my-map-status`, JSON.stringify(myMapStatus));
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    endLoading?.();
  }
};


export async function registerForPushNotificationsAsync() {
  let token;
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status } = await Notifications.requestPermissionsAsync();
  if (status === 'granted') {
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Permission for push notifications denied');
  }

  return token;
}
