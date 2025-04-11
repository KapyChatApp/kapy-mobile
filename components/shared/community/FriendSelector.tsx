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
import { FriendBoxProps, SelectFriendBoxProps } from "@/types/friend";
import { getMyBFFs } from "@/lib/my-bff";
import SelectFriendBox from "../friend/SelectFriendBox";
import { previousMonday } from "date-fns";
import CustomButton from "@/components/ui/CustomButton";
import { ShortUserProps } from "@/types/user";

const FriendSelector = ({
  visible,
  onClose,
  setSelectedFriend,
  defaultSelectedFriends,
}: {
  visible: boolean;
  onClose: () => void;
  setSelectedFriend: (Friend: FriendBoxProps[]) => void;
  defaultSelectedFriends?: ShortUserProps[];
}) => {
  const [BFFs, setBFFs] = useState<FriendBoxProps[]>([]);
  const [selectedBFFs, setSelectedBFFs] = useState<FriendBoxProps[]>([]);
  const [q, setQ] = useState<string>("");

  // Animation để kéo modal xuống
  const translateY = new Animated.Value(0);

  const fetchBff = async () => {
    const bffs = await getMyBFFs();
    setBFFs(bffs);
  };

  const handleSearch = () => {
    const lowerCaseQuery = q.toLowerCase();

    return BFFs.filter((friend) => {
      const fullName = `${friend.firstName} ${friend.lastName}`.toLowerCase();
      const reverseFullName =
        `${friend.lastName} ${friend.firstName}`.toLowerCase();

      return (
        friend.firstName?.toLowerCase().includes(lowerCaseQuery) ||
        friend.lastName?.toLowerCase().includes(lowerCaseQuery) ||
        fullName.includes(lowerCaseQuery) ||
        reverseFullName.includes(lowerCaseQuery)
      );
    });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(handler);
  }, [q]);

  useEffect(() => {
    fetchBff();
    if(defaultSelectedFriends){
      for (const selectedBFF of defaultSelectedFriends){
        for(const bff of BFFs){
          if(bff._id.toString()===selectedBFF.toString()){
            setSelectedBFFs((prev)=>[...prev, bff]);
          }
        }
      }
    }
  }, [selectedBFFs]);

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
                {BFFs.length != 0 ? (
                  <ScrollView
                    contentContainerStyle={{
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                    }}
                    className="w-full h-full"
                  >
                    {q !== ""
                      ? handleSearch().map((item, index) => (
                          <SelectFriendBox
                            onSelect={(data) => {
                              setSelectedBFFs((prev) => [...prev, data]);
                            }}
                            onUnSelect={(data) =>
                              setSelectedBFFs((prev) =>
                                prev.filter((item) => item._id !== data._id)
                              )
                            }
                            {...item}
                            key={index}
                          ></SelectFriendBox>
                        ))
                      : BFFs.map((item, index) => (
                          <SelectFriendBox
                            onSelect={(data) => {
                              setSelectedBFFs((prev) => [...prev, data]);
                            }}
                            onUnSelect={(data) =>
                              setSelectedBFFs((prev) =>
                                prev.filter((item) => item._id !== data._id)
                              )
                            }
                            {...item}
                            key={index}
                          ></SelectFriendBox>
                        ))}
                  </ScrollView>
                ) : (
                  <View className="w-full h-full flex items-center justify-center">
                    <ActivityIndicator size="small" color="#F57206" />
                  </View>
                )}
                {selectedBFFs.length !== 0 ? (
                  <View className="w-full items-end justify-end pb-14 px-2">
                    <CustomButton
                      width={100}
                      height={40}
                      label={`Add ${selectedBFFs.length} BFFs`}
                      onPress={() => {
                        setSelectedFriend(selectedBFFs);
                        onClose();
                      }}
                    />
                  </View>
                ) : null}
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

export default FriendSelector;
