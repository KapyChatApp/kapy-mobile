export interface FriendBoxProps{
    _id:string;
    avatar?:string;
    firstName?:string;
    lastName?:string;
    mutualFriends?:string;
    onlineTime?:string;    
    relation?:string;
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