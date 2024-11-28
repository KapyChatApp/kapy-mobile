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
  _id: string;
  isReact: boolean;
  readedId: string[];
  contentId: FileProps[];
  text: string;
  createAt: string;
  createBy: string;
  position:string;
  isSender:boolean;
  avatar:string;
  boxId:string;

}

export interface MessageBoxProps {
  _id?: string;
  groupName?: string;
  groupAva?: string;
  receiverIds?: ReceiverProps[];
  createAt?: string;
  lastMessage?: MessageProps;
  localUserId?:string;
  setLastMessage?:(message:string)=>void;
  readStatus?:boolean;
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
}
