import React from "react";
import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import ImageViewing from "react-native-image-viewing";
import VideoPlayer from "../shared/multimedia/VideoPlayer"; // Đường dẫn tới VideoPlayer của bạn.

interface MediaViewerProps {
  visible: boolean;
  initialIndex: number;
  medias: { type: "Image" | "Video"; url: string }[];
  onClose: () => void;
}

const MediaViewer = ({
  visible,
  initialIndex,
  medias,
  onClose,
}: MediaViewerProps) => {
  const isImage = (media: { type: string; url: string }) =>
    media.type === "Image";

  return (
    <Modal visible={visible} transparent={true} onRequestClose={onClose}>
      <View style={styles.container}>
        {isImage(medias[initialIndex]) ? (
          <ImageViewing
            images={medias.map((media) => ({ uri: media.url }))}
            imageIndex={initialIndex}
            visible={visible}
            onRequestClose={onClose}
          />
        ) : (
          <View style={styles.videoContainer}>
            <VideoPlayer videoSource={medias[initialIndex].url} />
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  videoContainer: {
    width: "100%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    marginTop: 16,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 8,
  },
  closeText: {
    color: "black",
    fontWeight: "bold",
  },
});

export default MediaViewer;
