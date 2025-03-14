export interface ShortUserProps{
  _id:string;
  firstName:string;
  lastName:string;
  nickName:string;
  avatar:string;
}

export interface UserRegisterProps {
  firstName: string;
  lastName: string;
  nickName: string;
  phoneNumber: string;
  email: string;
  password: string;
  rePassword: string;
}

export interface UserLoginProps {
  phoneNumber: string;
  password: string;
}
export interface HeadProfileProps {
  _id?:string;
  firstName?: string;
  lastName?: string;
  nickName?: string;
  bio?: string;
avatar?:string;
background?:string;
point?:string;
mutualFriends?:ShortUserProps[];
}
export interface UserBioProps {
  gender?: boolean;
  birthDay?: string;
  attendDate?: string;
  phoneNumber?: string;
  email?: string;
  relationShip?: string;
  address?: string;
  job?: string;
  hobbies?: string;
}

export interface HeaderProfileEditorProps{
  avatar?:string;
  background?:string;
  setStartLoading: () => void;
  setEndLoading: () => void;
  setIsLoading: () => void;
  setNotIsLoading: () => void;
  setReload:()=>void;
  setIsAvatarCameraOpen?:(value:boolean)=>void;
  setIsBgCameraOpen?:(value:boolean)=>void;
}

export interface BioEditorProps {
  firstName?: string;
  lastName?: string;
  nickName?: string;
  description?: string;
  gender?: boolean;
  birthDay?: string;
  attendDate?: string;
  phoneNumber?: string;
  email?: string;
  relationShip?: string;
  address?: string;
  job?: string;
  hobbies?: string;
  bio?:string;
  setStartLoading: () => void,
  setEndLoading: () => void,
  setIsLoading: () => void,
  setNotIsLoading: () => void
}
