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
          <Popover
            offset={0}
            popoverShift={{ x: 0, y: 0 }}
            backgroundStyle={{ backgroundColor: "transparent" }}
            arrowSize={{ width: 0, height: 0 }}
            placement={PopoverPlacement.BOTTOM}
            from={
              <TouchableOpacity className="border border-border rounded-full p-[2px] flex flex-row items-center justify-center">
                <Text className="font-helvetica-bold text-12 text-border ">
                  {isPrivate ? "Private" : "Public"}
                </Text>
                <Icon iconURL={IconURL.show_more_func} size={10} />
              </TouchableOpacity>
            }
          >
            <TouchableOpacity
              className="flex items-center justify-start w-[68px] border-b border-border"
              onPress={() => setIsPrivate(false)}
            >
              <Text className="font-helvetica-bold text-12 text-border px-[4px] py-[12px]">
                Public
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex items-center justify-start w-[68px]"
              onPress={() => setIsPrivate(true)}
            >
              <Text className="font-helvetica-bold text-12 text-border px-[4px] py-[12px]">
                Private
              </Text>
            </TouchableOpacity>
          </Popover>
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
          className={`${isMultipleLine? "rounded-xl":"rounded-full"}  border border-border font-helvetica-light text-14 px-[12px] flex-1 w-full h-full ${
            isReadOnly ? "text-deny" : textLight0Dark500
          }`}
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
