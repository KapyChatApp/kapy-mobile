import { MessageProps } from "@/types/message";
import PusherClient from "pusher-js";

export const pusherClient = new PusherClient(
  process.env.EXPO_PUBLIC_PUSHER_APP_KEY!,
  {
    cluster: process.env.EXPO_PUBLIC_PUSHER_APP_CLUSTER!,
    forceTLS: true,
    authEndpoint: 'api/pusher-auth',
    authTransport: 'ajax',
    auth:{
        headers:{
            'Content-Type':'application/json'
        }
    }
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
export const listenPusher = () => {
  const channel = pusherClient.subscribe("public");
  channel.bind("new-message", (data: any) => {
    console.log("Nhận tin nhắn từ server:", data);
  });

  return ()=>{
    pusherClient.unsubscribe("public");
    pusherClient.unbind("new-message",(data: any) => {
        console.log("Nhận tin nhắn từ server:", data);
      });
  }
};
