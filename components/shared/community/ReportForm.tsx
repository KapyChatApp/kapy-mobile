import { View, Text, TextInput } from "react-native";
import React from "react";
import CustomButton from "@/components/ui/CustomButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
import { textLight0Dark500 } from "@/styles/theme";
import { BlurView } from "@react-native-community/blur";
import { useClickOutside } from "react-native-click-outside";

const ReportForm = ({ setIsOpen }: any) => {
  const ref = useClickOutside<View>(() => setIsOpen(false));
  return (
    <View
      className="w-[386px] h-[388px] flex items-center justify-center p-[20px] absolute justify-self-center bg-whitesmoke dark:bg-dark-20 top-[50%] left-[50%] rounded-3xl"
      ref={ref}
      style={{
        rowGap: 10,
        transform: [{ translateX: -193 }, { translateY: -194 }],
      }}
    >
      <View className="flex flex-row justify-between items-center">
        <Text
          className={` ${textLight0Dark500} font-helvetica-bold text-16 flex-1`}
        >
          Report content
        </Text>
        <TouchableOpacity onPress={() => setIsOpen(false)} className="">
          <Icon iconURL={IconURL.close} size={36} />
        </TouchableOpacity>
      </View>

      <TextInput
        className={`flex-1 border border-border w-full rounded-3xl p-[16px] font-helvetica-light ${textLight0Dark500}`}
        placeholder="Write report here..." 
        multiline={true}
      />
      <CustomButton width={135} height={51} label="Submit" />
    </View>
  );
};

export default ReportForm;
