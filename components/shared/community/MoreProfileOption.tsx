import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Popover, { PopoverPlacement } from "react-native-popover-view";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import { block } from "@/requests/add-request";
const MoreProfileOption = ({setIsReportOpen, friendId, setStartLoading, setEndLoading, setIsLoading, setIsNotLoading}:any) => {
  const handleBlock = async ()=>{
    setStartLoading();
    setIsLoading();
    const blockStatus = await block(friendId);
    if(blockStatus){
      setIsNotLoading();
      const timmer = setInterval(()=> setEndLoading(), 1500);
      return ()=> clearInterval(timmer);
    }
  }
  return (
    <View className="absolute right-[10px] top-[20px]">
      <Popover
      offset={0}
      popoverShift={{x:0, y:0}}
        arrowSize={{ width: -2, height: -1 }}
        popoverStyle={{borderRadius:20}}
        from={
          <TouchableOpacity>
            <Icon iconURL={IconURL.more_func} size={30} />
          </TouchableOpacity>
        }
      >
        <TouchableOpacity className={`flex items-center justify-center p-[16px] w-[204px] ${bgLight500Dark10}`}>
          <Text className={`${textLight0Dark500} font-helvetica-light text-16`}>Share profile</Text>
        </TouchableOpacity>
        <View className='line w-full h-[1px] bg-border dark:bg-white' ></View>
        <TouchableOpacity onPress={()=> setIsReportOpen(true)} className={`flex items-center justify-center p-[16px] w-[204px] ${bgLight500Dark10}`}>
          <Text className={`${textLight0Dark500} font-helvetica-light text-16`}>Report</Text>
        </TouchableOpacity>
        <View className='line w-full h-[1px] bg-border dark:bg-white' ></View>
        <TouchableOpacity className={`flex items-center justify-center p-[16px] w-[204px] ${bgLight500Dark10}`} onPress={handleBlock}>
          <Text className={`${textLight0Dark500} font-helvetica-light text-16`}>Block</Text>
        </TouchableOpacity>
      </Popover>
    </View>
  );
};

export default MoreProfileOption;
