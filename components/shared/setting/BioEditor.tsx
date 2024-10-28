import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import EditableField from "@/components/ui/EditableField";
import CustomButton from "@/components/ui/CustomButton";
import Popover, { PopoverPlacement } from "react-native-popover-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import EditablePopover from "@/components/ui/EditablePopover";
import { Genders, RelationShips } from "@/constants/UiItems";
import EditableDatePicker from "@/components/ui/EditableDatePicker";
import { IconURL } from "@/constants/IconURL";
import { BioEditorProps } from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BioEditor = (props: BioEditorProps | undefined) => {
  const [gender, setGender] = useState<boolean | undefined>(true);
  const [birthday, setBirtday] = useState(new Date());
  const [relationShip, setRelationShip] = useState<string | undefined>("");
  const [firstName, setFirstName] = useState<string | undefined>("");
  const [lastName, setLastName] = useState<string | undefined>("");
  const [nickName, setNickname] = useState<string | undefined>("");
  const [job, setJob] = useState<string | undefined>("");
  const [hobbies, setHobbies] = useState<string | undefined>("");
  const [address, setAddress] = useState<string | undefined>("");
  const fieldHeight = 35;

  useEffect(() => {
    if (props) {
      setGender(props.gender);
      setFirstName(props.firstName);
      setLastName(props.lastName);
      setNickname(props.nickName);
      setJob(props.job);
      setHobbies(props.hobbies);
      setAddress(props.address);
    }
  }, [props]);

  const handleUpdateProfile = async () => {
    const profileData = {
      firstName,
      lastName,
      nickName,
      gender:true,
      address,
      job,
      hobbies,
      bio:"no thing",
      relationShip: "single",
      birthDay: new Date(1995, 6, 20),
    }

    const token = await AsyncStorage.getItem("token");
    try {
      const response = await axios.patch(process.env.BASE_URL + "/user/update", profileData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`,
        },
      });
  
      console.log("Profile updated successfully:", response.data); 
    } catch (error:any) {
      console.error("Error updating profile:", error.response ? error.response.data : error.message);
    }
  };
  return (
    <View
      className="px-[16px] flex items-center justify-center"
      style={{ rowGap: 10 }}
    >
      <View
        className="flex flex-row items-center justify-between w-full "
        style={{ columnGap: 20 }}
      >
        <View className="flex-1">
          <EditableField
            label="Firstname:"
            width="100%"
            height={fieldHeight}
            defaultValue={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View className="flex-1">
          <EditableField
            label="Lastname:"
            width="100%"
            height={fieldHeight}
            defaultValue={lastName}
            onChangeText={setLastName}
          />
        </View>
      </View>
      <View
        className="flex flex-row items-center justify-between w-full gap-x-"
        style={{ columnGap: 20 }}
      >
        <View className="flex-1">
          <EditableField
            label="Nickname:"
            width="100%"
            height={fieldHeight}
            defaultValue={nickName}
            onChangeText={setNickname}
          />
        </View>
        <View className="flex-1">
          <EditablePopover
            label="Gender"
            width="100%"
            height={fieldHeight}
            data={gender}
            setData={setGender}
            values={Genders}
            moreIconURL={IconURL.show_more_func}
            size={12}
          />
        </View>
      </View>

      <EditableDatePicker
        label="Birthday"
        width="100%"
        height={fieldHeight}
        data={birthday}
        setData={setBirtday}
      />
      <EditableField
        label="Address:"
        width="100%"
        height={fieldHeight}
        defaultValue={address}
        onChangeText={setAddress}
      />
      <EditableField
        label="Jobs:"
        width="100%"
        height={fieldHeight}
        defaultValue={job}
        onChangeText={setJob}
      />
      <EditableField
        label="Hobbies:"
        width="100%"
        height={fieldHeight}
        defaultValue={hobbies}
        onChangeText={setHobbies}
      />
      <EditablePopover
        label="RelationShip: "
        width="100%"
        height={fieldHeight}
        data={relationShip}
        setData={setRelationShip}
        values={RelationShips}
        moreIconURL={IconURL.relationship}
        size={18}
      />

      <EditableField
        label="Phonenumber:"
        width="100%"
        height={fieldHeight}
        defaultValue={props?.phoneNumber}
        isAlwaysReadOnly={true}
        notice="PhoneNumber can only change in"
        labelLink="Security"
        redirectLink="/"
        onChangeText={(e: any) => console.log(e.target.value)}
      />
      <EditableField
        label="Email:"
        width="100%"
        height={fieldHeight}
        defaultValue={props?.email}
        notice="Email can only change in"
        labelLink="Security"
        redirectLink="/"
        isAlwaysReadOnly={true}
        onChangeText={(e: any) => console.log(e.target.value)}
      />
      <CustomButton
        type={false}
        label="Submit"
        fontSize={14}
        width={100}
        height={46}
        onPress={handleUpdateProfile}
      ></CustomButton>
    </View>
  );
};

export default BioEditor;
