import { ShortUserProps } from "./user";

export interface FriendBoxProps{
    _id:string;
    avatar?:string;
    firstName?:string;
    lastName?:string;
    mutualFriends?:ShortUserProps[];
    onlineTime?:string;    
    relation?:string;
    localUserId?:string;
}

export interface SelectFriendBoxProps{
    _id:string;
    avatar?:string;
    firstName?:string;
    lastName?:string;
    mutualFriends?:ShortUserProps[];
    onlineTime?:string;    
    relation?:string;
    onSelect?:(data:FriendBoxProps)=>void;
    onUnSelect:(data:FriendBoxProps)=>void;
    isDisable?:boolean;
}

export interface RequestedProps{
    _id:string;
    firstName:string;
    lastName:string;
    avatar:string;
    mutualFriends?:string;
    message?:string;
    relation:string;
    createAt:string;
}