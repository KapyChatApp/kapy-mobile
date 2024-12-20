import { AppSound } from "@/constants/Sound";
import { playSound } from "./Media";

export const onRefresh = async (handleRefresh:()=>void)=>{
    handleRefresh();
    await playSound(AppSound.reload);
}