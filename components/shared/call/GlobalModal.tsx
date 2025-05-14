import React from "react";
import IncomingCallModal from "./IncomingCallModal";
import { useSocket } from "@/context/SocketContext";
import { useRouter } from "expo-router";
import { getFromAsyncStorage } from "@/utils/Device";

const GlobalModals = () => {
  const { incomingCall, setIncomingCall } = useSocket();
  const router = useRouter();
  if (!incomingCall) return null;

  return (
    <IncomingCallModal
      visible={true}
      callerName={
        incomingCall.caller.profile.firstName +
        " " +
        incomingCall.caller.profile.lastName
      }
      onAccept={() => {
        console.log("Accepted call");
        setIncomingCall(null);
        if (incomingCall.isVideoCall) {
          router.push({
            pathname: "/chatbox/video-call/[userId]",
            params: { userId: incomingCall.caller.profile._id },
          });
        }
      }}
      onDecline={() => {
        console.log("Declined call");
        setIncomingCall(null);
      }}
      avatarUrl={incomingCall.caller.profile.avatar}
    />
  );
};

export default GlobalModals;
