import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { Socket } from "socket.io-client";
import { getSocket, closeSocket } from "../lib/socket";
import { getFromAsyncStorage } from "@/utils/Device";
import { SocketUser } from "@/types/socket";

// Kiểu dữ liệu cho cuộc gọi đến
type IncomingCall = {
  caller: SocketUser;
  isVideoCall: boolean;
};

// Kiểu dữ liệu của context
type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
  onlineUsers: SocketUser[];
  socketId: string;
  incomingCall: IncomingCall | null;
  setIncomingCall: React.Dispatch<React.SetStateAction<IncomingCall | null>>;
};

// Giá trị mặc định của context
const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  onlineUsers: [],
  socketId: "",
  incomingCall: null,
  setIncomingCall: () => {},
});

// Provider
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<SocketUser[]>([]);
  const [socketId, setSocketId] = useState<string>("");
  const [incomingCall, setIncomingCall] = useState<IncomingCall | null>(null);

  useEffect(() => {
    const setupSocket = async () => {
      const user = await getFromAsyncStorage("user");

      if (!user || !user._id) {
        console.error("User data is missing or invalid:", user);
        return;
      }

      const s = getSocket();

      s.on("connect", () => {
        console.log("🔌 Connected to server:", s.id);
        setSocketId(s.id || "");
        s.emit("addNewUsers", user);
        setIsConnected(true);
      });

      s.on("getUsers", (data) => {
        console.log("🟢 Online users:", data);
        setOnlineUsers(data);
      });

      s.on("incomingCall", (participants, isVideoCall) => {
        console.log("📞 Incoming call from:", participants);
        setIncomingCall({
          caller: participants.caller,
          isVideoCall,
        });

        Alert.alert(
          "Cuộc gọi đến",
          `Bạn có một cuộc gọi ${isVideoCall ? "video" : "âm thanh"} từ ${participants.sender.profile.name}`
        );
      });

      s.on("disconnect", () => {
        console.log("❌ Disconnected from server");
        setIsConnected(false);
      });

      setSocket(s);
    };

    setupSocket();

    return () => {
      closeSocket();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        onlineUsers,
        socketId,
        incomingCall,
        setIncomingCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

// Hook sử dụng context
export const useSocket = () => useContext(SocketContext);
