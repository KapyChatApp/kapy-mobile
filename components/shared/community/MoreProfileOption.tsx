import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Platform } from "react-native";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import { block } from "@/lib/add-request";
import { useClickOutside } from "react-native-click-outside";
import { useRouter } from "expo-router";

const MoreProfileOption = ({
  setIsReportOpen,
  friendId,
  setStartLoading,
  setEndLoading,
  setIsLoading,
  setIsNotLoading,
}: any) => {
  const ref = useClickOutside<View>(()=>setModalVisible(false));
  const [modalVisible, setModalVisible] = useState(false);
  const  router =useRouter();
  const handleBlock = async () => {
    setStartLoading();
    setIsLoading();
    const blockStatus = await block(friendId);
    if (blockStatus) {
      setIsNotLoading();
      const timer = setInterval(() => setEndLoading(), 1500);
      return () => clearInterval(timer);
    }
  };

  return (
    <View className="absolute right-[10px] top-[20px]">
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Icon iconURL={IconURL.more_func} size={30} />
      </TouchableOpacity>
      <View className="">
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          style={{ alignItems: "flex-end", justifyContent: "flex-end" }}
        >
          <View ref={ref}
            className={`${bgLight500Dark10} absolute w-[150px] right-0 ${Platform.OS==="ios"? "top-[76px]":"top-[60px]"}  rounded-3xl`}
          >
            <TouchableOpacity className="flex items-center justify-center w-full h-[50px]  border-border border-b-[0.5px]"
              onPress={() => {
                // Handle Share profile
                setModalVisible(false);
              }}
            >
              <Text className={`${textLight0Dark500} font-helvetica-light text-14 text-center`}>Share profile</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex items-center justify-center w-full h-[50px]  border-border border-y-[0.5px]"
              onPress={() => {
                setModalVisible(false);
                router.push({pathname:"/report"})
              }}
            >
              <Text className={`${textLight0Dark500} font-helvetica-light text-14 text-center`}>Report</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex items-center justify-center w-full h-[50px]  border-border border-t-[0.5px]"
              onPress={() => {
                handleBlock();
                setModalVisible(false);
              }}
            >
              <Text className={`${textLight0Dark500} font-helvetica-light text-14 text-center`}>Block</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default MoreProfileOption;
