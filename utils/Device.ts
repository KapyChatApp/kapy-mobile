import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
export const ScreenRatio = height / width;

export const getFromAsyncStorage = async (key:string)=>{
    try{
        const objectString = await AsyncStorage.getItem(key);
        const object = await JSON.parse(objectString!);
        return object;
    }catch(error){
        console.log(error);
        return null;
    }
}