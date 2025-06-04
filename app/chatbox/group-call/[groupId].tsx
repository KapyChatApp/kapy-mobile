// GroupCallScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RTCView } from "react-native-webrtc";
import { useVideoGroupCall } from "@/context/VideoGroupCallContext";
import { getAMessageBox } from "@/lib/message";
import Icon from "react-native-vector-icons/MaterialIcons";
import { MessageBoxProps } from "@/types/message";

const { width, height } = Dimensions.get("window");

const GroupCallScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { groupId } = route.params;
  const {
    localStream,
    peers,
    participantsGroup,
    isInCall,
    isJoining,
    callState,
    currentUserId,
    isMuted,
    isVideoOff,
    startGroupCall,
    joinCall,
    acceptAndJoinCall,
    declineCall,
    endCall,
    toggleMute,
    toggleVideo,
    getParticipantName,
  } = useVideoGroupCall();
  const [messageBox, setMessageBox] = useState<MessageBoxProps>();
  const [maximizedStreamId, setMaximizedStreamId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const initialize = async () => {
      try {
        const box = await getAMessageBox(groupId);
        setMessageBox(box);
      } catch (error) {
        console.error("ERROR: Failed to initialize:", error);
      }
    };
    initialize();
  }, [groupId]);

  useEffect(() => {
    if (messageBox && currentUserId) {
      const groupInfo = {
        _id: messageBox._id,
        name: messageBox.groupName || "Group Call",
        avatar: messageBox.groupAva || "",
        members: messageBox.receiverIds!.map((r) => ({
          _id: r._id,
          firstName: r.firstName,
          lastName: r.lastName,
          nickName: r.nickName || "",
          avatar: r.avatar || "",
          isOnline: false, // Note: Update this if onlineUsers are available
        })),
      };
      // Trigger request for ongoing call
      // This can be moved to context if needed globally
    }
  }, [messageBox, currentUserId]);

  const handleStreamPress = (streamId: string | null) => {
    setMaximizedStreamId((prev) => (prev === streamId ? null : streamId));
  };

  const renderCallControls = () => {
    if (callState === "incoming") {
      return (
        <View style={styles.incomingCallControls}>
          <TouchableOpacity style={styles.declineButton} onPress={declineCall}>
            <Icon name="call-end" size={32} color="#fff" />
            <Text style={styles.buttonText}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.joinButton, { opacity: isJoining ? 0.6 : 1 }]}
            onPress={() =>
              participantsGroup && acceptAndJoinCall(participantsGroup)
            }
            disabled={isJoining}
          >
            <Icon name="call" size={32} color="#fff" />
            <Text style={styles.buttonText}>Join</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (callState === "idle") {
      return (
        <View style={styles.incomingCallControls}>
          <TouchableOpacity
            style={[
              styles.startButton,
              { opacity: !localStream || !messageBox ? 0.6 : 1 },
            ]}
            onPress={() => startGroupCall(groupId, messageBox)}
            disabled={!localStream || !messageBox}
          >
            <Icon name="videocam" size={32} color="#fff" />
            <Text style={styles.buttonText}>Start Call</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (callState === "canJoin") {
      return (
        <View style={styles.incomingCallControls}>
          <TouchableOpacity
            style={[
              styles.joinCallButton,
              { opacity: isJoining || !localStream || !messageBox ? 0.6 : 1 },
            ]}
            onPress={joinCall}
            disabled={isJoining || !localStream || !messageBox}
          >
            <Icon name="call" size={32} color="#fff" />
            <Text style={styles.buttonText}>Join Call</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.callControls}>
        <TouchableOpacity
          style={[styles.controlButton, isMuted && styles.mutedButton]}
          onPress={toggleMute}
        >
          <Icon name={isMuted ? "mic-off" : "mic"} size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.endCallButton} onPress={endCall}>
          <Icon name="call-end" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.controlButton, isVideoOff && styles.mutedButton]}
          onPress={toggleVideo}
        >
          <Icon
            name={isVideoOff ? "videocam-off" : "videocam"}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderStream = (
    stream: MediaStream | null,
    userId: string,
    isLocal: boolean,
    isMaximized: boolean
  ) => {
    if (!stream) return null;
    return (
      <TouchableOpacity
        key={userId}
        style={[
          isMaximized ? styles.maximizedVideoWrapper : styles.videoWrapper,
          isLocal && !isMaximized && styles.localVideoContainer,
        ]}
        onPress={() => handleStreamPress(userId)}
      >
        <RTCView
          streamURL={stream.toURL()}
          style={isMaximized ? styles.maximizedVideo : styles.video}
          objectFit="cover"
          mirror={isLocal}
        />
        <Text
          style={isMaximized ? styles.maximizedVideoLabel : styles.videoLabel}
        >
          {isLocal ? "You" : getParticipantName(userId)}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderVideos = () => {
    const allStreams = [
      ...(localStream
        ? [{ stream: localStream, userId: currentUserId, isLocal: true }]
        : []),
      ...peers
        .filter((peer) => peer.stream)
        .map((peer) => ({
          stream: peer.stream!,
          userId: peer.participant.userId,
          isLocal: false,
        })),
    ];

    if (!allStreams.length && callState !== "idle") {
      return (
        <View style={styles.waitingContainer}>
          <Icon
            name="people"
            size={64}
            color="#ccc"
            style={styles.waitingIcon}
          />
          <Text style={styles.waitingText}>
            {callState === "calling"
              ? "Waiting for others to join..."
              : callState === "incoming"
              ? "Incoming call..."
              : "Connecting..."}
          </Text>
        </View>
      );
    }

    if (maximizedStreamId) {
      const maximizedStream = allStreams.find(
        (s) => s.userId === maximizedStreamId
      );
      const otherStreams = allStreams.filter(
        (s) => s.userId !== maximizedStreamId
      );

      return (
        <View style={styles.videoContainer}>
          {maximizedStream &&
            renderStream(
              maximizedStream.stream,
              maximizedStream.userId,
              maximizedStream.isLocal,
              true
            )}
          {otherStreams.length > 0 && (
            <ScrollView
              horizontal
              style={styles.thumbnailContainer}
              contentContainerStyle={styles.thumbnailContent}
            >
              {otherStreams.map((s) =>
                renderStream(s.stream, s.userId, s.isLocal, false)
              )}
            </ScrollView>
          )}
        </View>
      );
    }

    return (
      <View style={styles.videoContainer}>
        <View style={styles.gridContainer}>
          {allStreams.map((s) =>
            renderStream(s.stream, s.userId, s.isLocal, false)
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>
            {participantsGroup?.groupDetails.name ||
              messageBox?.groupName ||
              "Group Call"}
          </Text>
          <Text style={styles.subtitle}>
            {callState === "calling" ? "Calling..." : ""}
            {callState === "incoming" ? "Incoming call" : ""}
            {callState === "connected" &&
              `${participantsGroup?.currentJoiners.length || 0} participants`}
            {callState === "canJoin" ? "Ongoing call" : ""}
            {callState === "idle" && "Ready to call"}
          </Text>
        </View>
      </View>
      {renderVideos()}
      <View style={styles.controlsContainer}>{renderCallControls()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#2a2a2a",
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#aaa",
  },
  headerContent: {
    flex: 1,
  },
  videoContainer: {
    flex: 1,
    padding: 16,
  },
  gridContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  videoWrapper: {
    width: width > 600 ? width / 3 - 24 : width / 2 - 24,
    aspectRatio: 3 / 4,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#333",
    elevation: 4,
  },
  localVideoContainer: {
    width: width > 600 ? width / 4 - 24 : width / 3 - 24,
    aspectRatio: 3 / 4,
    zIndex: 10,
    borderWidth: 2,
    borderColor: "#ffffff55",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  videoLabel: {
    position: "absolute",
    bottom: 8,
    left: 8,
    fontSize: 13,
    color: "#fff",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  maximizedVideoWrapper: {
    width: "100%",
    height: height * 0.65,
    aspectRatio: 3 / 4,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#333",
    elevation: 4,
    marginBottom: 12,
    alignSelf: "center",
  },
  maximizedVideo: {
    width: "100%",
    height: "100%",
  },
  maximizedVideoLabel: {
    position: "absolute",
    bottom: 12,
    left: 12,
    fontSize: 16,
    color: "#fff",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  thumbnailContainer: {
    maxHeight: 150,
  },
  thumbnailContent: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
  },
  waitingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  waitingIcon: {
    marginBottom: 16,
  },
  waitingText: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "center",
  },
  controlsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: "#2a2a2a",
  },
  incomingCallControls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  joinCallButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2196F3",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  declineButton: {
    backgroundColor: "#f44336",
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  joinButton: {
    backgroundColor: "#4CAF50",
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  callControls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  controlButton: {
    backgroundColor: "#555",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  mutedButton: {
    backgroundColor: "#f44336",
  },
  endCallButton: {
    backgroundColor: "#f44336",
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
});

export default GroupCallScreen;
