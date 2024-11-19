import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import { block } from "@/requests/add-request";

const MoreProfileOption = ({
  setIsReportOpen,
  friendId,
  setStartLoading,
  setEndLoading,
  setIsLoading,
  setIsNotLoading,
}: any) => {
  const [modalVisible, setModalVisible] = useState(false);

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
    <View style={styles.container} className={``}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Icon iconURL={IconURL.more_func} size={30} />
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
       
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => {
                // Handle Share profile
                setModalVisible(false);
              }}
              style={styles.option}
            >
              <Text style={styles.optionText} className={`${textLight0Dark500}`}>Share profile</Text>
            </TouchableOpacity>

            <View style={styles.line} />

            <TouchableOpacity
              onPress={() => {
                setIsReportOpen(true);
                setModalVisible(false);
              }}
              style={styles.option}
            >
              <Text style={styles.optionText} className={`${textLight0Dark500}`}>Report</Text>
            </TouchableOpacity>

            <View style={styles.line} />

            <TouchableOpacity
              onPress={() => {
                handleBlock();
                setModalVisible(false);
              }}
              style={styles.option}
            >
              <Text style={styles.optionText} className={`${textLight0Dark500}`}>Block</Text>
            </TouchableOpacity>
          </View>

      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 10,
    top: 20,
  },
  modalContent: {
    width: 204,
    backgroundColor: bgLight500Dark10,
    borderRadius: 20,
    paddingVertical: 8,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    width: "100%",
  },
  optionText: {
    fontSize: 16,
    fontFamily: "Helvetica-Light",
    color: textLight0Dark500,
  },
  line: {
    height: 1,
    backgroundColor: "#ccc", // Có thể điều chỉnh cho chế độ sáng/tối
  },
});

export default MoreProfileOption;
