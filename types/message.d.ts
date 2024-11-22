import { FileProps } from "./file";

export interface CreateChatBoxProps{
    membersIds:string[];
    leaderId:string;
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

export interface MessageProps{
  _id:string;
  isReact:boolean;
  readedId:any;
  contentId:FileProps;
  text:string[];
  createAt:string;
  createBy:string;
  isSender:boolean;
  position:string;
  avatar?:string;
}

export interface MessageBoxProps{
  _id:string;
  name:string;
  avatar:string;
  receiverId:string;
  messages:MessageProps[];
}

export interface ChatBoxHeaderProps{
  name?:string | undefined,
  isOnline?:boolean;
  avatar?:string;
  receiverId?:string;
}