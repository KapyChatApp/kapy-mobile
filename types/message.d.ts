import { FileProps } from "./file";

export interface CreateChatBoxProps {
  membersIds: string[];
  leaderId: string;
}

export interface CreateMessageData {
  userId: string;
  groupId: string;
  content: any;
  recipientId: string[];
}

export interface ResponseMessageDTO {
  _id: string;
  flag: boolean;
  readedId: string[];
  contentModel: string;
  contentId: FileProps[];
  createAt: Date;
  createBy: string;
}

export interface MessageProps {
  id: string;
  isReact: string[];
  readedId: string[];
  contentId?: FileProps;
  text: string;
  createAt: string;
  createBy: string;
  position:string;
  isSender:boolean;
  avatar:string;
  boxId:string;
  createBy:string;
  localUserId?:string;
  deleteMessage?:(id:string)=>void;
  revokeMessage?:(id:string)=>void;
  handleViewImage:(imageURL:string)=>void;
  handleViewFile:(file:FileProps)=>void;
  sendStatus?:string;
  memberAvatars?: Map<string, string>
}

export interface MessageBoxProps {
  _id?: string;
  groupName?: string;
  groupAva?: string;
  receiverIds?: ReceiverProps[];
  createAt?: string;
  createBy?:string;
  responseLastMessage?: MessageProps;
  localUserId?:string;
  setLastMessage?:(message:string)=>void;
  readStatus?:boolean;
  isOnline?:boolean;
  isKicked?:boolean;
}

export interface ChatBoxHeaderProps {
  _id?:string;
  name?: string | undefined;
  isOnline?: boolean;
  avatar?: string;
  receiverId?: string;
}

export interface ReceiverProps {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatar: string;
  localUserId?:string;
  isLeader?:boolean;
  isLeaderRole?:boolean;
  handleRemoveMember?:(id:string)=>void;
  handleChangeLeader?:(id:string)=>void;
}
