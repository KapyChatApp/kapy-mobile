import { View, Text, Pressable } from "react-native";
import React from "react";
import { FileProps } from "@/types/file";
import { IconURL } from "@/constants/IconURL";
import { VideoPlayer } from "expo-video";
import AudioPlayer from "../shared/multimedia/AudioPlayer";
import Icon from "./Icon";
import { openWebFile } from "@/utils/File";
import { textLight0Dark500 } from "@/styles/theme";

const renderFileIcon = (type:string)=>{
    switch(type){
        case "docx":
            return <Icon iconURL={IconURL.docx} size={60}/>
        case "xlsx":
            return <Icon iconURL ={IconURL.xls} size={60}/>
            case "pptx":
                return <Icon iconURL = {IconURL.ppt} size={60}/>
                case "pdf":
                    return  <Icon iconURL = {IconURL.pdf} size={60}/>
                    default:
                        return <Icon iconURL={IconURL.my_document} size={60}/>
     }
}

const LocalFile = ({ file }: { file: {uri:string, type:string, name:string}}) => {
    return(
        <Pressable className=" flex w-[200px]  " style={{rowGap:10}} onPress={async()=>await openWebFile(file.uri)}>
            <View className="w-[200px] h-[200px] flex items-center justify-center bg-whitesmoke dark:bg-dark-20 rounded-2xl p-[20px]">
                {renderFileIcon(file.uri?.split(".").pop()!)}
            </View>
            <View>
                <Text className={`${textLight0Dark500} font-helvetica-bold`}>{file.name}</Text>
            </View>

      </Pressable>
    )
};

export default LocalFile;
