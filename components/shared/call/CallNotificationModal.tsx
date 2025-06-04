// CallNotificationModal.tsx
import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useVideoGroupCall } from "@/context/VideoGroupCallContext";
import Icon from "react-native-vector-icons/MaterialIcons";

const CallNotificationModal = () => {
  const navigation = useNavigation<any>();
  const { showCallModal, incomingGroupId, handleAcceptCall, handleDeclineCall, participantsGroup } = useVideoGroupCall();

  const onAccept = () => {
    handleAcceptCall();
    if (incomingGroupId) {
      navigation.navigate("ChatBox", {
        screen: "GroupCall",
        params: { groupId: incomingGroupId },
      });
    }
  };

  return (
    <Modal
      visible={showCallModal}
      transparent={true}
      animationType="fade"
      onRequestClose={handleDeclineCall}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Incoming Group Call</Text>
          <Text style={styles.modalText}>
            From: {participantsGroup?.groupDetails.name || "Group Call"}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.declineButton} onPress={handleDeclineCall}>
              <Icon name="call-end" size={24} color="#fff" />
              <Text style={styles.buttonText}>Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
              <Icon name="call" size={24} color="#fff" />
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  declineButton: {
    backgroundColor: "#f44336",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
  },
});

export default CallNotificationModal;