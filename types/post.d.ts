import { FileProps } from "./file";

export interface SocialPostProps{
    _id:string;
    firstName:string;
    lastName:string;
    nickName:string;
    avatar:string;
    userId:string;
    likedIds:string[];
    shares:any[];
    comments:any[];
    caption:string;
    createAt:string;
    contents:FileProps[];
    isDetail?:boolean;
}