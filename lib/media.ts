import axios from "axios";
import { getLocalAuth } from "./local-auth";

export const getFilesOfAMessageBox = async (boxId:string)=>{
   try{
    const {token}= await getLocalAuth();
    const response = await axios.get(process.env.EXPO_PUBLIC_BASE_URL + "/message/files", {headers:{
      "Content-Type":"application/json",
      Authorization:`${token}`
    },params:{boxId:boxId}});
    return response.data;
  }
   catch(error){
    console.log(error);
    throw error;
   }
}