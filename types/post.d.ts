import { FileProps } from "./file";
import { ShortUserProps } from "./user";

export interface SocialPostProps {
  _id: string;
  firstName: string;
  lastName: string;
  nickName: string;
  avatar: string;
  userId: string;
  likedIds: string[];
  shares: any[];
  comments: CommentProps[];
  caption: string;
  createAt: string;
  contents: FileProps[];
  isDetail?: boolean;
  tags:ShortUserProps[];
  musicName?:string;
  musicURL?:string;
  musicAuthor?:string;
  musicImageURL?:string;
  handleImageViewing:(uri:string)=>void;
  isDetailView?: boolean;
}

export interface CommentProps {
  _id: string;
  firstName: string;
  lastName: string;
  nickName: string;
  avatar: string;
  userId: string;
  likedIds: string[];
  replieds: CommentProps[];
  caption: string;
  createAt: string;
  createBy:string;
  content: FileProps;
  replyName?:string;
  setReplyName:(name:string)=>void;
  setReplyCommentId:(id:string)=>void;
  setTargetType:(type:string)=>void;
  isReply?:boolean;
  isLastComment?:boolean;
  handleDelete?:(id:string)=>void;
  handleImageViewing:(uri:string)=>void;
}
