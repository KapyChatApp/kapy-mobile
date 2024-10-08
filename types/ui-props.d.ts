import { DimensionValue } from "react-native";
import { Int32 } from "react-native/Libraries/Types/CodegenTypes";

export interface IconInputField {
  name: string;
  placeHolder: string;
  iconURL: string;
  size: Int32;
}

export interface EditableInputFieldProps {
  label?: string;
  placeHolder?: string;
  width: DimensionValue | undefined;
  height: DimensionValue | undefined;
  moreIconURL?: ImageSourcePropType | undefined;
  size?: Int32;
  isAlwaysReadOnly?: boolean;
  defaultValue?: any;
  notice?: string;
  onChangeText: (text: string) => void;
}

export interface EditablePopoverProps{
  label?:string;
  placeHolder?:string;
  width: DimensionValue | undefined;
  height: DimensionValue | undefined;
  values:any[];
  data?:any;
  setData?:(data)=>void;
}