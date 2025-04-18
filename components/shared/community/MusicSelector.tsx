import { getMusicList, searchMusic } from "@/lib/music";
import { bgLight500Dark10 } from "@/styles/theme";
import { MusicTrack } from "@/types/music";
import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from "react-native";
import {
  ScrollView,
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import MusicBox from "./MusicBox";
import Search from "../function/Search";

const MusicSelector = ({
  visible,
  onClose,
  selectedMusic,
  setSelectedMusic,
}: {
  visible: boolean;
  onClose: () => void;
  selectedMusic?: MusicTrack|null;
  setSelectedMusic: (music: MusicTrack | null) => void;
}) => {
  const [musics, setMusics] = useState<MusicTrack[]>([]);
  const [q, setQ] = useState<string>("");
  const [searchResult, setSearchResult] = useState<MusicTrack[]>([]);

  // Animation để kéo modal xuống
  const translateY = new Animated.Value(0);

  const fetchMusic = async () => {
    const musics = await getMusicList();
    setMusics(musics);
  };

  const handleSearch = async () => {
    const result: MusicTrack[] = await searchMusic(q);
    setSearchResult(result);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(handler);
  }, [q]);

  useEffect(() => {
    fetchMusic();
  }, []);

  // Xử lý kéo xuống để đóng modal
  const handleGesture = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: false }
  );

  const handleGestureEnd = (event: any) => {
    if (event.nativeEvent.translationY > 100) {
      // Nếu kéo xuống hơn 100px thì đóng modal
      onClose();
    } else {
      // Nếu chưa đủ thì đưa modal về vị trí cũ
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <GestureHandlerRootView className="flex justify-end ">
              <View
                className={`max-h-[90%] w-full ${bgLight500Dark10} pt-[20px]`}
                style={{ rowGap: 10 }}
              >
                {/* Thanh kéo có thể kéo xuống */}
                <PanGestureHandler
                  onGestureEvent={handleGesture}
                  onHandlerStateChange={handleGestureEnd}
                >
                  <View style={styles.dragBarContainer}>
                    <View style={styles.dragBar} />
                  </View>
                </PanGestureHandler>

                <Search onChangeText={setQ} />
                {musics.length != 0 ? (
                  <ScrollView
                    contentContainerStyle={{
                      rowGap: 4,
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                    }}
                    className="w-full h-full"
                  >
                    {q === ""
                      ? musics.map((item, index) => (
                          <MusicBox
                            key={index}
                            {...item}
                            setSelectedMusic={() => {
                              setSelectedMusic(item);
                              onClose();
                            }}
                            deleteMusic={() => {
                              setSelectedMusic(null);
                              onClose();
                            }}
                            isSelected={
                              selectedMusic?.previewUrl === item.previewUrl
                                ? true
                                : false
                            }
                          />
                        ))
                      : searchResult.map((item, index) => (
                          <MusicBox
                            key={index}
                            {...item}
                            setSelectedMusic={() => {
                              setSelectedMusic(item);
                              onClose();
                            }}
                            deleteMusic={() => {
                              setSelectedMusic(null);
                              onClose();
                            }}
                            isSelected={
                              selectedMusic?.previewUrl === item.previewUrl
                                ? true
                                : false
                            }
                          />
                        ))}
                  </ScrollView>
                ) : (
                  <View className="w-full h-full flex items-center justify-center">
                    <ActivityIndicator size="small" color="#F57206" />
                  </View>
                )}
              </View>
            </GestureHandlerRootView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end", // Modal luôn ở góc dưới
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: 10,
    rowGap: 10,
    alignSelf: "flex-end", // Modal nằm sát cạnh dưới
  },
  dragBarContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
  },
  dragBar: {
    width: 50,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#ccc",
  },
});

export default MusicSelector;
