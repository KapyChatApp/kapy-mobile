import { ReceiverProps } from "./message";

export type SocketUser = {
  userId: string;
  socketId: string;
  profile: any;
};

export type Participants = {
  caller: SocketUser;
  receiver: SocketUser;
};

export type OngoingCall = {
  participants: Participants;
  isRinging: boolean;
  isVideoCall: boolean;
};

export type PeerData = {
  peerConnection: Peer.Instance;
  stream: MediaStream | undefined;
  participantUser: SocketUser;
};


export type GroupDetails ={
  _id: string;
  name: string;
  avatar: string;
  members: ReceiverProps[];
}

export type ParticipantsGroup ={
  caller: SocketUser;
  callees: SocketUser[];
  currentJoiners: SocketUser[];
  groupDetails: GroupDetails;
}