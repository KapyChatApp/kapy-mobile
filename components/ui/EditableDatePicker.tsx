import { View, Text, Button, Platform, Image } from "react-native";
import React, { useState } from "react";
import Popover, { PopoverPlacement } from "react-native-popover-view";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "./Icon";
import { IconURL } from "@/constants/IconURL";
import { EditabelDatePickerProps } from "@/types/ui-props";
import DatePicker from "react-native-date-picker";
import DateTimePicker from "react-native-ui-datepicker";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useClickOutside } from "react-native-click-outside";
import { formatDate } from "@/utils/DateFormatter";
const EditableDatePicker = ({
  label,
  placeHolder,
  width,
  height,
  data,
  setData,
}: EditabelDatePickerProps) => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [open, setOpen] = useState(Platform.OS ==="android"? false:true);
  const ref = useClickOutside<View>(() => setOpen(false));
  const [inLineDate, setInlineDate] = useState("");
  const setDate = (event: DateTimePickerEvent, date?: Date) => {
    const {
      type,
      nativeEvent: {timestamp, utcOffset},
    } = event;
    setData?.(date);
    if(Platform.OS==="android"){
      setOpen(false);
    }
    
  };
  
  return (
    <View>
      <View className="w-full flex flex-row items-center gap-x-[4px]">
        <Text className={`font-helvetica-light ${textLight0Dark500} text-14`}>
          {label}
        </Text>
      </View>
      <View
        className="flex items-center flex-row  w-full"
        style={{ width: width, height: height, columnGap: 5 }}
      >
        <TextInput
          className={`rounded-full border border-border font-helvetica-light text-14 px-[12px] flex-1 w-full h-full ${textLight0Dark500}`}
          defaultValue={formatDate(data)}
          placeholder={placeHolder}
          onFocus={() => setOpen(true)}
        ></TextInput>
        <View className="absolute w-full flex items-end pr-[28px]">
          {open? (<RNDateTimePicker
            value={data}
            style={{ width: 300, height:28}}
            textColor="#F57602"
            mode="date"
            onChange={setDate}
            positiveButton={{label: 'OK', textColor: 'green'}} 
          />):null}
          
        </View>
        <TouchableOpacity>
          <Icon iconURL={IconURL.editable} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditableDatePicker;
