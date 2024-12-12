import axios from "axios";
import { getLocalAuth } from "./local-auth";
import { Alert } from "react-native";

export const createReport = async (content:string, targetId:string, targetType:string, setStartLoading:any, setEndLoading:any,setIsLoading:any, setNotIsLoading:any, goBack:any )=>{
    try{
        setStartLoading();
        setIsLoading();
        const {token} =await getLocalAuth();
        const  response = await axios.post(process.env.EXPO_PUBLIC_BASE_URL + "/report/create",{content:content, targetId:targetId, targetType:targetType},{headers:{
            "Content-Type":"application/json",
            Authorization:`${token}`
        }});
        if(response.status!=200 && response.status!=201){
            setNotIsLoading();
            setEndLoading();
            Alert.alert("Cannot report now, please try again!");
        } else{
            setNotIsLoading();
            setTimeout(()=>setEndLoading(),2000);
            setTimeout(()=>goBack(),2500);
        }
    }catch(error){
        console.log(error);
        throw error;
    }
}