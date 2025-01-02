import { View, Text, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import Previous from "@/components/ui/Previous";
import { ReceiverProps } from "@/types/message";
import { changeLeader, getAMessageBox, removeMember } from "@/lib/message";
import { getLocalAuth } from "@/lib/local";
import MemberBox from "@/components/shared/group/MemberBox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { bgLight500Dark10 } from "@/styles/theme";
import CustomButton from "@/components/ui/CustomButton";
import { IconURL } from "@/constants/IconURL";
import AddMemberForm from "@/components/form/AddMemberForm";
import { pusherClient } from "@/lib/pusher";
import { getFromAsyncStorage } from "@/utils/Device";

const MembersPage = () => {
  const { boxId } = useLocalSearchParams();
  const navigation = useNavigation();
  const [members, setMembers] = useState<ReceiverProps[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [localUserId, setLocalUserId] = useState("");
  const [isLeaderRole, setIsLeaderRole] = useState(false);
  const handleRemoveMember = async (id: string) => {
    await removeMember(boxId.toString(), id, () => {});
    const updatedMemebers = members.filter((item) => item._id != id);
    setMembers(updatedMemebers);
  };

  const handleChangeLeader = async (id: string) => {
    await changeLeader(boxId.toString(), id, () => {});
    setIsLeaderRole(false);
    const chatBoxes = await getFromAsyncStorage("ChatBoxes");
    const updatedChatBoxes = chatBoxes.map((item: any) =>
      item._id === boxId.toString ? { ...item, createBy: id } : item
    );
    const box = await getFromAsyncStorage(`box-${boxId.toString()}`);
    const updatedBox = { ...box, createBy: id };
    await AsyncStorage.setItem("ChatBoxes", JSON.stringify(updatedChatBoxes));
    await AsyncStorage.setItem(
      `box-${boxId.toString()}`,
      JSON.stringify(updatedBox)
    );
  };

  useFocusEffect(
    useCallback(() => {
      const getMemberFUNC = async () => {
        const boxString = await AsyncStorage.getItem(`box-${boxId}`);
        const box = await JSON.parse(boxString!);
        const { _id } = await getLocalAuth();
        if (box.createBy === _id) {
          setIsLeaderRole(true);
        }
        setLocalUserId(_id);
        const updatedMembers = box.receiverIds.map((item: ReceiverProps) => {
          return {
            ...item,
            localUserId: _id,
            isLeader: box.createBy === item._id ? true : false,
          };
        });

        setMembers(updatedMembers);
      };

      getMemberFUNC();
      const channel = pusherClient.subscribe(`private-${localUserId}`);
      channel.bind("new-box", async (data: any) => {
        const myChatBoxes = await getFromAsyncStorage("ChatBoxes");
        const updatedChatBoxes = myChatBoxes.map((item: any) =>
          item._id === data._id ? data : item
        );
        await AsyncStorage.setItem(
          "ChatBoxes",
          JSON.stringify(updatedChatBoxes)
        );
        await AsyncStorage.setItem(`box-${data._id}`, JSON.stringify(data));
      });
    }, [boxId])
  );

  return (
    <View
      className={`p-[10px] ${bgLight500Dark10} flex-1`}
      style={{ rowGap: 20 }}
    >
      <View className="flex flex-row items-center justify-between">
        <Previous navigation={navigation} header="Members" />
        <CustomButton
          label="Add"
          iconURL={IconURL.plus_white}
          fontSize={14}
          iconSize={16}
          size={30}
          width={90}
          height={40}
          onPress={() => setIsVisible(true)}
        />
      </View>
      <ScrollView style={{ rowGap: 4 }}>
        {members
          ? members.map((item, index) => (
              <View
                key={index}
                className={`${
                  index === members.length - 1
                    ? "border-y-[0.5px] "
                    : "border-t-[0.5px]"
                } border-border`}
              >
                <MemberBox
                  {...item}
                  isLeaderRole={isLeaderRole}
                  handleRemoveMember={handleRemoveMember}
                  handleChangeLeader={handleChangeLeader}
                />
              </View>
            ))
          : null}
      </ScrollView>
      {isVisible ? (
        <AddMemberForm
          members={members}
          setMembers={(selected: any) =>
            setMembers((prev) => [...prev, ...selected])
          }
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
          boxId={boxId}
        />
      ) : null}
    </View>
  );
};

export default MembersPage;
