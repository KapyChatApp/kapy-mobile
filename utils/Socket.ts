import { io } from "socket.io-client";

export const socket = io(process.env.EXPO_PUBLIC_SERVER, {
  transports: ["websocket"],
});
