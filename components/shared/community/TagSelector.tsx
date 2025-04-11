import {
  View,
  Text,
  ActivityIndicator,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "@/components/ui/CustomButton";
import { bgLight500Dark10 } from "@/styles/theme";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import SelectFriendBox from "../friend/SelectFriendBox";
import Search from "../function/Search";
import { ShortUserProps } from "@/types/user";
import { getMyBFFs } from "@/lib/my-bff";
import EditSelectedFriendBox from "../friend/EditSelectedFriendBox";

const TagSelector = ({
  visible,
  onClose,
  selectedTags,
  onSelectTag,
  onUnselectTag,
}: {
  visible: boolean;
  onClose: () => void;
  selectedTags: ShortUserProps[];
  onSelectTag: (data: ShortUserProps) => void;
  onUnselectTag:(data:ShortUserProps)=>void;
}) => {
  const [q, setQ] = useState("");
  const [BFFs, setBFFs]=  useState<ShortUserProps[]>([]);

  const fetchBff = async () => {
      const bffs = await getMyBFFs();
      const bffShortUsers: ShortUserProps[] = [];
      for(const bff of bffs){
        const bffShortUser:ShortUserProps = {
            _id:bff._id,
            firstName:bff.firstName!,
            lastName:bff.lastName!,
            nickName:"",
            avatar:bff.avatar!
        }
        bffShortUsers.push(bffShortUser)
      }
      setBFFs(bffShortUsers);
    };

  const translateY = new Animated.Value(0);
  const handleGesture = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: false }
  );

  const handleGestureEnd = (event: any) => {
    if (event.nativeEvent.translationY > 100) {
      onClose();
    } else {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(()=>{fetchBff()},[])
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
                   {BFFs.map((item, index)=><TouchableOpacity key={index}  onPress={()=>{
                    if(selectedTags.some((tag)=>tag._id===item._id)){
                        onUnselectTag(item);
                    }else{
                        onSelectTag(item);
                    }
                   }}><EditSelectedFriendBox data={item} isSelected={selectedTags.some((tag)=>tag._id===item._id)? true: false}/></TouchableOpacity>)}
                  </ScrollView>
                ) : (
                  <View className="w-full h-full flex items-center justify-center">
                    <ActivityIndicator size="small" color="#F57206" />
                  </View>
                )}
                  <View className="w-full items-end justify-end pb-14 px-2">
                    <CustomButton
                      width={100}
                      height={40}
                      label={`Add ${selectedTags.length} BFFs`}
                      onPress={() => {
                        onClose();
                      }}
                    />
                  </View>
              </View>
            </GestureHandlerRootView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default TagSelector;

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
