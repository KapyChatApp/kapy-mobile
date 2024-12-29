import { MessageProps } from "@/types/message";
import PusherClient from "pusher-js";
import { getLocalAuth } from "./local";

const getToken = async () => {
  const { token } = await getLocalAuth();
  return token;
};
export const pusherClient = new PusherClient(
  process.env.EXPO_PUBLIC_PUSHER_APP_KEY!,
  {
    cluster: process.env.EXPO_PUBLIC_PUSHER_APP_CLUSTER!,
    forceTLS: true,
    authEndpoint: process.env.EXPO_PUBLIC_BASE_URL + "/pusher/auth",
    auth: {
      headers: {
        Authorization: `${getToken()}`,
      },
    },
  }
);

pusherClient.connection.bind("error", (err: any) => {
  console.error("Lỗi kết nối Pusher:", err);
});

pusherClient.connection.bind("connected", () => {
  console.log("Pusher đã kết nối thành công!");
});

pusherClient.connection.bind("disconnected", () => {
  console.log("Pusher đã bị ngắt kết nối!");
});
