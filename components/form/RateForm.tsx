import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
import { TextInput } from "react-native-gesture-handler";
import CustomButton from "@/components/ui/CustomButton";
import { useClickOutside } from "react-native-click-outside";
import { renderCarrot } from "../shared/community/Rate";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { createRate } from "@/lib/rate";
import { CreateRateProps } from "@/types/rate";

const RateForm = ({
  userId,
  onClose,
  defaultPoint,
  defaultMessage,
  setReload,
}: {
  userId: string;
  defaultPoint?: number;
  defaultMessage?: string;
  onClose: () => void;
  setReload: () => void;
}) => {
  const ref = useClickOutside<View>(() => onClose());
  const [point, setPoint] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Modal
      visible={true}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View
          ref={ref}
          className={`w-[350px] h-[400px] ${bgLight500Dark10} rounded-3xl p-[20px] flex items-center justify-center`}
        >
          <View
            className="flex-1 w-full  flex items-center justify-center"
            style={{ rowGap: 20 }}
          >
            <View className="flex flex-row justify-between items-center w-full">
              <Text
                className={`${textLight0Dark500} text-18 font-helvetica-bold`}
              >
                Rate
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Icon size={30} iconURL={IconURL.close} />
              </TouchableOpacity>
            </View>
            <View className="w-full" style={{ rowGap: 4 }}>
              <Text
                className={`${textLight0Dark500} font-helvetica-bold text-14`}
              >
                Point
              </Text>
              <View
                className="flex flex-row items-center"
                style={{ columnGap: 10 }}
              >
                <TextInput
                  keyboardType="numeric"
                  maxLength={3}
                  numberOfLines={1}
                  className={`w-[80px] h-[50px] border border-border rounded-xl p-[4px] text-[20px] ${textLight0Dark500} text-center font-helvetica-bold`}
                  placeholder="100"
                  onChangeText={setPoint}
                  defaultValue={defaultPoint?.toString()}
                />
                <View>{renderCarrot(Number.parseInt(point))}</View>
              </View>
            </View>
            <View className="w-full" style={{ rowGap: 4 }}>
              <Text
                className={`${textLight0Dark500} font-helvetica-bold text-14`}
              >
                Message
              </Text>
              <TextInput
                multiline={true}
                className={`w-full h-[100px] border border-border rounded-xl p-[10px] text-12 ${textLight0Dark500} font-helvetica-light`}
                placeholder="Type..."
                onChangeText={setMessage}
                defaultValue={defaultMessage?.toString()}
              />
            </View>
            <CustomButton
              width={100}
              height={50}
              label="Submit"
              onPress={async () => {
                const param: CreateRateProps = {
                  userId: userId,
                  point: Number.parseInt(point),
                  message: message,
                };
                await createRate(
                  param,
                  () => setLoading(true),
                  () => setLoading(false),
                  () => setIsLoading(true),
                  () => setIsLoading(false),
                  () => setReload()
                );
              }}
            />
          </View>
        </View>
      </View>
      {loading ? <LoadingSpinner loading={isLoading} /> : null}
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Làm tối nền
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RateForm;
