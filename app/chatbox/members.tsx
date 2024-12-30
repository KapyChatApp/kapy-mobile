import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Previous from "@/components/ui/Previous";
import { ReceiverProps } from "@/types/message";
import { getAMessageBox } from "@/lib/message";
import { getLocalAuth } from "@/lib/local";
import MemberBox from "@/components/shared/friend/MemberBox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { bgLight500Dark10 } from "@/styles/theme";
import CustomButton from "@/components/ui/CustomButton";
import { IconURL } from "@/constants/IconURL";
import AddMemberForm from "@/components/form/AddMemberForm";

const MembersPage = () => {
  const { boxId } = useLocalSearchParams();
  const navigation = useNavigation();
  const [members, setMembers] = useState<ReceiverProps[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const getMemberFUNC = async () => {
      const boxString = await AsyncStorage.getItem(`box-${boxId}`);
      const box = await JSON.parse(boxString!);
      console.log("box: ", box);
      const { _id } = await getLocalAuth();
      const updatedMembers = box.receiverIds.map((item: ReceiverProps) => {
        return {
          ...item,
          localUserId: _id,
        };
      });

      setMembers(updatedMembers);
    };

    getMemberFUNC();
  }, [boxId]);

  return (
    <View
      className={`p-[10px] ${bgLight500Dark10} flex-1`}
      style={{ rowGap: 20 }}
    >
      <View className="flex flex-row items-center justify-between">
        <Previous navigation={navigation} header="Members" />
        <CustomButton label="Add" iconURL={IconURL.plus_white} fontSize={14} iconSize={16} size={30} width={90} height={40} onPress={()=>setIsVisible(true)}/>
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
                <MemberBox {...item} />
              </View>
            ))
          : null}
      </ScrollView>
      {isVisible? <AddMemberForm members={members} isVisible={isVisible} onClose={()=>setIsVisible(false)}/>:null}
    </View>
  );
};

export default MembersPage;
