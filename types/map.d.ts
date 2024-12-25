import { FileProps } from "./file";
import { LocationProps } from "./location";
import { ShortUserProps } from "./user";

export interface MapStatusProps{
    _id?:string;
    caption?:string;
    content?:FileProps;
    location?:LocationProps;
    createAt?:string;
    createBy?:ShortUserProps;
    markerBottom?:number;
    markerSize?:number;
    handleImageViewing?:(data:any)=>void;
}

export interface CreateMapStatusProps{
    caption:string;
    file?:formidable.File;
}

export interface EditMapStatusProps{
    caption:string;
    file:formidable.File;
    keepOldContent:boolean;
}