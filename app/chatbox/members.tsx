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

const MembersPage = () => {
  const { boxId } = useLocalSearchParams();
  const navigation = useNavigation();
  const [members, setMembers] = useState<ReceiverProps[]>([]);

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
      <View>
        <Previous navigation={navigation} header="Members" />
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
    </View>
  );
};

export default MembersPage;
