import { View, Text, TextInput, Modal, StyleSheet } from "react-native";
import React from "react";
import CustomButton from "@/components/ui/CustomButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
import { textLight0Dark500 } from "@/styles/theme";
import { BlurView } from "@react-native-community/blur";
import { useClickOutside } from "react-native-click-outside";

const ReportForm = ({ onClose }: {onClose:()=>void}) => {
  const ref = useClickOutside<View>(()=>onClose());
  return (
    <View className="flex-1 " style={{zIndex:100}}>
    <Modal visible={true} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View
          className="w-[386px] h-[400px] flex items-center justify-center p-[20px] absolute bg-whitesmoke dark:bg-dark-20 rounded-3xl flex-1"
          ref={ref}
          style={{
            rowGap: 20,
          }}
        >
           <View className="flex flex-row justify-between items-center w-full">
              <Text
                className={`${textLight0Dark500} text-18 font-helvetica-bold`}
              >
                Report
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Icon size={30} iconURL={IconURL.close} />
              </TouchableOpacity>
          
          </View>

          <TextInput
            className={`flex-1 border border-border w-full rounded-3xl p-[16px] font-helvetica-light ${textLight0Dark500}`}
            placeholder="Write report here..."
            multiline={true}
          />
          <CustomButton width={135} height={51} label="Submit" />
        </View>
      </View>
    </Modal>
    </View>
  );
};

export default ReportForm;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
