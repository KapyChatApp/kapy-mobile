import { ShortUserProps } from "./user";

export interface CreateRateProps {
  userId: string;
  point: number;
  message: string;
}

export interface RateProps{
  _id:string;
  point:number;
  message:string;
  createAt:string;
  user:ShortUserProps;
}