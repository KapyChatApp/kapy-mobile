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
  firstName?: string;
  lastName?: string;
  nickName?: string;
  description?: string;
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
}
