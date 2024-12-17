import { View, Text, Pressable } from "react-native";
import React from "react";
import { FileProps } from "@/types/file";
import { IconURL } from "@/constants/IconURL";
import { VideoPlayer } from "expo-video";
import AudioPlayer from "../shared/multimedia/AudioPlayer";
import Icon from "./Icon";
import { openWebFile } from "@/utils/File";
import { textLight0Dark500 } from "@/styles/theme";

const renderFileIcon = (type:string, iconSize:number)=>{
    switch(type){
        case "docx":
            return <Icon iconURL={IconURL.docx} size={iconSize}/>
        case "xlsx":
            return <Icon iconURL ={IconURL.xls} size={iconSize}/>
            case "pptx":
                return <Icon iconURL = {IconURL.ppt} size={iconSize}/>
                case "pdf":
                    return  <Icon iconURL = {IconURL.pdf} size={iconSize}/>
                    default:
                        return <Icon iconURL={IconURL.my_document} size={iconSize}/>
     }
}

const LocalFile = ({ file, size, iconSize }: { file: {uri:string, type:string, name:string}, size:number, iconSize:number}) => {
    return(
        <Pressable className=" flex " style={{rowGap:10, width:size}} onPress={async()=>await openWebFile(file.uri)}>
            <View className=" flex items-center justify-center bg-whitesmoke dark:bg-dark-20 rounded-2xl p-[20px]" style={{width:size, height:size}}>
                {renderFileIcon(file.uri?.split(".").pop()!,iconSize)}
            </View>
            <View>
                <Text className={`${textLight0Dark500} font-helvetica-bold`}>{file.name}</Text>
            </View>

      </Pressable>
    )
};

export default LocalFile;
