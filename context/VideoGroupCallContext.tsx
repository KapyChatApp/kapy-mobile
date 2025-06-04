// VideoGroupCallContext.tsx
import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import {
  RTCPeerConnection,
  mediaDevices,
  MediaStream,
  RTCSessionDescription,
  RTCIceCandidate,
} from "react-native-webrtc";
import { useSocket } from "@/context/SocketContext";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import { getLocalAuth } from "@/lib/local";

interface Participant {
  userId: string;
  socketId: string;
}

interface UserInfoBox {
  _id: string;
  firstName: string;
  lastName: string;
  nickName: string;
  avatar: string;
  isOnline: boolean;
}

interface GroupDetails {
  _id: string;
  name: string;
  avatar: string;
  members: UserInfoBox[];
}

interface ParticipantsGroup {
  caller: Participant;
  callees: Participant[];
  currentJoiners: Participant[];
  groupDetails: GroupDetails;
}

interface OngoingGroupCall {
  participantsGroup: ParticipantsGroup;
  isRinging: boolean;
}

interface WebRTCSignal {
  sdp: any;
  fromUserId: string;
  toUserId: string;
  ongoingGroupCall: OngoingGroupCall;
}

interface PeerData {
  peerConnection: RTCPeerConnection;
  participant: Participant;
  stream?: MediaStream;
}

interface VideoGroupCallContextType {
  localStream: MediaStream | null;
  peers: PeerData[];
  participantsGroup: ParticipantsGroup | null;
  isInCall: boolean;
  isJoining: boolean;
  callState: "idle" | "calling" | "incoming" | "connected" | "canJoin";
  currentUserId: string;
  isMuted: boolean;
  isVideoOff: boolean;
  startGroupCall: (groupId: string, messageBox: any) => void;
  joinCall: () => void;
  acceptAndJoinCall: (participants: ParticipantsGroup) => void;
  declineCall: () => void;
  endCall: () => void;
  toggleMute: () => void;
  toggleVideo: () => void;
  getParticipantName: (userId: string) => string;
}

const VideoGroupCallContext = createContext<VideoGroupCallContextType | undefined>(undefined);

const configuration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    {
      urls: "turn:turn.anyfirewall.com:443?transport=tcp",
      username: "webrtc",
      credential: "webrtc",
    },
  ],
};

export const VideoGroupCallProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { socket, onlineUsers, socketId } = useSocket();
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [peers, setPeers] = useState<PeerData[]>([]);
  const [participantsGroup, setParticipantsGroup] = useState<ParticipantsGroup | null>(null);
  const [isInCall, setIsInCall] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [callState, setCallState] = useState<"idle" | "calling" | "incoming" | "connected" | "canJoin">("idle");
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const isProcessingCall = useRef(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        const user = await getLocalAuth();
        setCurrentUserId(user._id);
      } catch (error) {
        console.error("ERROR: Failed to initialize user:", error);
        Alert.alert("Error", "Failed to initialize user");
      }
    };
    initialize();
  }, []);

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        if (Platform.OS === "android") {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ]);
          if (
            granted[PermissionsAndroid.PERMISSIONS.CAMERA] !== "granted" ||
            granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] !== "granted"
          ) {
            Alert.alert("Permission Required", "Camera and microphone permissions are required for video calls");
            return;
          }
        }
        const stream = await mediaDevices.getUserMedia({
          audio: true,
          video: { width: 480, height: 640, frameRate: 30 },
        });
        setLocalStream(stream);
      } catch (error) {
        console.error("ERROR: Failed to access media devices:", error);
        Alert.alert("Error", "Failed to access camera or microphone");
      }
    };
    requestPermissions();

    return () => {
      localStream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const createPeerConnection = (
    participant: Participant,
    ongoingGroupCall: OngoingGroupCall,
    initiator: boolean = true
  ) => {
    if (!participant.userId || participant.userId === currentUserId) {
      console.warn(`WARN: Skipping peer creation for invalid or self userId: ${participant.userId}`);
      return null;
    }

    const pc = new RTCPeerConnection(configuration);

    if (localStream) {
      localStream.getTracks().forEach((track) => {
        if (track.readyState === "live" && track.enabled) {
          pc.addTrack(track, localStream);
        }
      });
    }

    const remoteStream = new MediaStream();
    pc.ontrack = (event) => {
      if (event.streams && event.streams[0]) {
        event.streams[0].getTracks().forEach((track) => {
          if (!remoteStream.getTracks().some((t) => t.id === track.id)) {
            remoteStream.addTrack(track);
          }
        });
        setPeers((prev) =>
          prev.map((p) =>
            p.participant.userId === participant.userId
              ? { ...p, stream: remoteStream }
              : p
          )
        );
      }
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket?.emit("groupWebrtcSignal", {
          sdp: event.candidate,
          fromUserId: currentUserId,
          toUserId: participant.userId,
          ongoingGroupCall,
        });
      }
    };

    pc.onnegotiationneeded = async () => {
      if (!initiator || pc.signalingState !== "stable") return;
      try {
        const offer = await pc.createOffer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true,
        });
        await pc.setLocalDescription(offer);
        socket?.emit("groupWebrtcSignal", {
          sdp: offer,
          fromUserId: currentUserId,
          toUserId: participant.userId,
          ongoingGroupCall,
        });
      } catch (error) {
        console.error(`ERROR: Negotiation failed for ${participant.userId}:`, error);
      }
    };

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === "connected") {
        setCallState("connected");
      } else if (["failed", "disconnected", "closed"].includes(pc.connectionState)) {
        setPeers((prev) => prev.filter((p) => p.participant.userId !== participant.userId));
      }
    };

    pc.oniceconnectionstatechange = () => {
      if (["failed", "disconnected"].includes(pc.iceConnectionState)) {
        pc.restartIce();
      }
    };

    return pc;
  };

  const handleGroupWebrtcSignal = async (data: WebRTCSignal) => {
    const { sdp, fromUserId, toUserId, ongoingGroupCall } = data;
    if (!fromUserId || fromUserId === currentUserId || (toUserId && toUserId !== currentUserId)) return;

    try {
      let peer = peers.find((p) => p.participant.userId === fromUserId);
      if (!peer) {
        const pc = createPeerConnection({ userId: fromUserId, socketId: "" }, ongoingGroupCall, false);
        if (!pc) return;
        peer = { peerConnection: pc, participant: { userId: fromUserId, socketId: "" } };
        setPeers((prev) => [...prev, peer!]);
      }

      const pc = peer.peerConnection;

      if (sdp.type === "offer") {
        if (pc.signalingState !== "stable") {
          await pc.setLocalDescription({ type: "rollback" });
        }
        await pc.setRemoteDescription(new RTCSessionDescription(sdp));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket?.emit("groupWebrtcSignal", {
          sdp: answer,
          fromUserId: currentUserId,
          toUserId: fromUserId,
          ongoingGroupCall,
        });
      } else if (sdp.type === "answer") {
        if (pc.signalingState === "have-local-offer") {
          await pc.setRemoteDescription(new RTCSessionDescription(sdp));
        }
      } else if (sdp.candidate) {
        await pc.addIceCandidate(new RTCIceCandidate(sdp));
      }
    } catch (error) {
      console.error(`ERROR: Failed to handle signal from ${fromUserId}:`, error);
    }
  };

  const createPeersForJoiners = (ongoingGroupCall: OngoingGroupCall) => {
    const joiners = ongoingGroupCall.participantsGroup.currentJoiners.filter(
      (j) => j.userId !== currentUserId
    );
    const newPeers = joiners
      .map((joiner) => {
        const pc = createPeerConnection(joiner, ongoingGroupCall, true);
        return pc ? { peerConnection: pc, participant: joiner } : null;
      })
      .filter(Boolean) as PeerData[];
    setPeers((prev) => [
      ...prev.filter((p) => !joiners.some((j) => j.userId === p.participant.userId)),
      ...newPeers,
    ]);
  };

  const startGroupCall = async (groupId: string, messageBox: any) => {
    if (!messageBox || !localStream || !socket || !currentUserId || !socketId) return;

    const members = messageBox.receiverIds!.map((r: any) => ({
      _id: r._id,
      firstName: r.firstName,
      lastName: r.lastName,
      nickName: r.nickName || "",
      avatar: r.avatar || "",
      isOnline: onlineUsers.some((u: any) => u.userId === r._id),
    }));

    const groupDetails = {
      _id: groupId,
      name: messageBox.groupName || "Group Call",
      avatar: messageBox.groupAva || "",
      members,
    };

    const callees = members
      .filter((m: any) => m._id !== currentUserId && m.isOnline)
      .map((m: any) => ({
        userId: m._id,
        socketId: onlineUsers.find((u: any) => u.userId === m._id)?.socketId || "",
      }));

    const participantsGroup = {
      caller: { userId: currentUserId, socketId },
      callees,
      currentJoiners: [{ userId: currentUserId, socketId }],
      groupDetails,
    };

    setParticipantsGroup(participantsGroup);
    setIsInCall(true);
    setCallState("calling");

    const newPeers = callees
      .map((callee) => {
        const pc = createPeerConnection(callee, { participantsGroup, isRinging: false }, true);
        return pc ? { peerConnection: pc, participant: callee } : null;
      })
      .filter(Boolean) as PeerData[];
    setPeers(newPeers);

    socket.emit("groupCall", participantsGroup);
  };

  const acceptAndJoinCall = async (participants: ParticipantsGroup) => {
    if (!localStream || !socket || !socketId || isProcessingCall.current) return;

    isProcessingCall.current = true;
    setIsJoining(true);
    setCallState("connected");
    setIsInCall(true);

    const updatedParticipants = {
      ...participants,
      currentJoiners: [...participants.currentJoiners, { userId: currentUserId, socketId }],
    };

    const ongoingGroupCall = { participantsGroup: updatedParticipants, isRinging: false };
    setParticipantsGroup(updatedParticipants);
    createPeersForJoiners(ongoingGroupCall);

    socket.emit("newGroupParticipant", {
      newCallee: { userId: currentUserId, socketId },
      updatedOngoing: ongoingGroupCall,
    });

    setIsJoining(false);
    isProcessingCall.current = false;
  };

  const joinCall = async () => {
    if (!participantsGroup || !localStream || !socket || !socketId) return;

    const alreadyJoined = participantsGroup.currentJoiners.some(
      (j) => j.userId === currentUserId
    );

    if (alreadyJoined) return;

    setIsJoining(true);
    const updatedParticipants = {
      ...participantsGroup,
      currentJoiners: [...participantsGroup.currentJoiners, { userId: currentUserId, socketId }],
    };

    const ongoingGroupCall = { participantsGroup: updatedParticipants, isRinging: false };
    setParticipantsGroup(updatedParticipants);
    createPeersForJoiners(ongoingGroupCall);

    socket.emit("newGroupParticipant", {
      newCallee: { userId: currentUserId, socketId },
      updatedOngoing: ongoingGroupCall,
    });

    setIsInCall(true);
    setCallState("connected");
    setIsJoining(false);
  };

  const declineCall = () => {
    if (participantsGroup && socket) {
      socket.emit("groupHangup", {
        userHangingupId: currentUserId,
        ongoingGroupCall: { participantsGroup, isRinging: false },
        isEmitHangup: false,
      });
    }
    cleanup();
  };

  const endCall = () => {
    if (!participantsGroup || !socket) return;

    socket.emit("groupHangup", {
      userHangingupId: currentUserId,
      ongoingGroupCall: { participantsGroup, isRinging: false },
      isEmitHangup: participantsGroup.caller.userId === currentUserId,
    });
    cleanup();
  };

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !isMuted;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !isVideoOff;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  const cleanup = () => {
    peers.forEach((peer) => peer.peerConnection.close());
    setPeers([]);
    setLocalStream((prev) => {
      prev?.getTracks().forEach((track) => track.stop());
      return null;
    });
    setIsInCall(false);
    setIsJoining(false);
    setCallState("idle");
    setParticipantsGroup(null);
  };

  const getParticipantName = (userId: string) => {
    if (!participantsGroup) return userId;
    const member = participantsGroup.groupDetails.members.find((m) => m._id === userId);
    return member ? `${member.firstName} ${member.lastName}` : userId;
  };

  useEffect(() => {
    if (!socket || !currentUserId) return;

    const handleGroupCall = (participants: ParticipantsGroup) => {
      if (isProcessingCall.current || isInCall || participants.caller.userId === currentUserId) return;
      setParticipantsGroup(participants);
      setCallState("incoming");
      Alert.alert("Incoming Call", "Do you want to join this group call?", [
        { text: "Join", onPress: () => acceptAndJoinCall(participants) },
        { text: "Decline", onPress: declineCall, style: "cancel" },
      ]);
    };

    const handleProvideGroupCallData = (ongoingGroupCall: OngoingGroupCall) => {
      setParticipantsGroup(ongoingGroupCall.participantsGroup);
      const isAlreadyJoined = ongoingGroupCall.participantsGroup.currentJoiners.some(
        (joiner) => joiner.userId === currentUserId
      );
      if (!isAlreadyJoined) {
        setCallState("canJoin");
      } else {
        setCallState("connected");
        setIsInCall(true);
        createPeersForJoiners(ongoingGroupCall);
      }
    };

    const handleNewGroupParticipant = (data: { newCallee: Participant; updatedOngoing: OngoingGroupCall }) => {
      setParticipantsGroup(data.updatedOngoing.participantsGroup);
      if (isInCall && data.newCallee.userId !== currentUserId) {
        const exists = peers.some((p) => p.participant.userId === data.newCallee.userId);
        if (exists) return;
        const pc = createPeerConnection(data.newCallee, data.updatedOngoing, true);
        if (pc) {
          setPeers((prev) => [...prev, { peerConnection: pc, participant: data.newCallee }]);
        }
      }
    };

    const handleGroupHangup = () => {
      cleanup();
      setParticipantsGroup(null);
      setCallState("idle");
    };

    socket.on("groupCall", handleGroupCall);
    socket.on("provideOngoingGroupCall", handleProvideGroupCallData);
    socket.on("newGroupParticipant", handleNewGroupParticipant);
    socket.on("groupWebrtcSignal", handleGroupWebrtcSignal);
    socket.on("groupHangup", handleGroupHangup);

    return () => {
      socket.off("groupCall", handleGroupCall);
      socket.off("provideOngoingGroupCall", handleProvideGroupCallData);
      socket.off("newGroupParticipant", handleNewGroupParticipant);
      socket.off("groupWebrtcSignal", handleGroupWebrtcSignal);
      socket.off("groupHangup", handleGroupHangup);
    };
  }, [socket, currentUserId, isInCall, localStream, peers]);

  return (
    <VideoGroupCallContext.Provider
      value={{
        localStream,
        peers,
        participantsGroup,
        isInCall,
        isJoining,
        callState,
        currentUserId,
        isMuted,
        isVideoOff,
        startGroupCall,
        joinCall,
        acceptAndJoinCall,
        declineCall,
        endCall,
        toggleMute,
        toggleVideo,
        getParticipantName,
      }}
    >
      {children}
    </VideoGroupCallContext.Provider>
  );
};

export const useVideoGroupCall = () => {
  const context = useContext(VideoGroupCallContext);
  if (!context) {
    throw new Error("useVideoGroupCall must be used within a VideoGroupCallProvider");
  }
  return context;
};