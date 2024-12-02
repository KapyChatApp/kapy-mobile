import { View, Text, TextInput, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { EditableInputFieldProps } from "@/types/ui-props";
import Popover, { PopoverPlacement } from "react-native-popover-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IconURL } from "@/constants/IconURL";
import Icon from "./Icon";
import { Link } from "expo-router";
import { textLight0Dark500 } from "@/styles/theme";

const EditableField = ({
  label,
  placeHolder,
  width,
  height,
  moreIconURL,
  size,
  isAlwaysReadOnly,
  isMultipleLine,
  defaultValue,
  notice,
  onChangeText,
  labelLink,
  redirectLink,
}: EditableInputFieldProps) => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);
  const [inputValue, setInputValue] = useState<string>(defaultValue || '');

  useEffect(() => {
    if (defaultValue) {
      setInputValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <View>
      <View className="w-full flex flex-row items-center gap-x-[4px]">
        <Text className={`font-helvetica-light text-14 ${textLight0Dark500}`}>{label}</Text>
        <View className="w-[68px] h-[26px]">
          <TouchableOpacity/>
        </View>
        {redirectLink ? (
          <View className="flex flex-row items-center gap-x-[2px]">
            <Text className={`font-helvetica-light text-10 ${textLight0Dark500} `}>{notice}</Text>
            <Link href={redirectLink} className="font-helvetica-bold text-10 text-cardinal">
              {labelLink}
            </Link>
          </View>
        ) : null}
      </View>
      <View
        className={`flex ${isMultipleLine? "":"items-center"}  flex-row w-full`}
        style={{ width: width, height: height, columnGap: 5 }}
      >
        <TextInput
          className={`${isMultipleLine? "rounded-xl":"rounded-full"}  border border-border font-helvetica-light text-12 px-[12px] flex-1 w-full h-full ${
            isReadOnly ? "text-deny" : textLight0Dark500
          } ${isMultipleLine? "text-start":""}`}
          multiline={isMultipleLine}
          value={inputValue}
          readOnly={isAlwaysReadOnly ? true : isReadOnly}
          placeholder={placeHolder}
          onChangeText={(text) => {
            setInputValue(text);
            if (onChangeText) onChangeText(text);
          }}
        />
        {isAlwaysReadOnly ? null : (
          <TouchableOpacity onPress={() => setIsReadOnly(false)}>
            <Icon iconURL={IconURL.editable} size={18} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default EditableField;
