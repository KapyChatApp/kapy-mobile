import { View, Text } from "react-native";
import React, { useState } from "react";
import EditableField from "@/components/ui/EditableField";
import CustomButton from "@/components/ui/CustomButton";
import Popover, { PopoverPlacement } from "react-native-popover-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import EditablePopover from "@/components/ui/EditablePopover";
import { Genders, RelationShips } from "@/constants/UiItems";
import EditableDatePicker from "@/components/ui/EditableDatePicker";
import { IconURL } from "@/constants/IconURL";

const BioEditor = () => {
  const [gender, setGender] = useState("Male");
  const [birthday, setBirtday] = useState(new Date());
  const [relationShip, setRelationShip] = useState("single");
  const fieldHeight = 35;
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
            defaultValue="Recent name"
            onChangeText={(e: any) => console.log(e.target.value)}
          />
        </View>
        <View className="flex-1">
          <EditableField
            label="Lastname:"
            width="100%"
            height={fieldHeight}
            defaultValue="Recent name"
            onChangeText={(e: any) => console.log(e.target.value)}
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
            defaultValue="Recent name"
            onChangeText={(e: any) => console.log(e.target.value)}
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
        defaultValue="Default value"
        onChangeText={(e: any) => console.log(e.target.value)}
      />
      <EditableField
        label="Jobs:"
        width="100%"
        height={fieldHeight}
        defaultValue="Default value"
        onChangeText={(e: any) => console.log(e.target.value)}
      />
      <EditableField
        label="Hobbies:"
        width="100%"
        height={fieldHeight}
        defaultValue="Default value"
        onChangeText={(e: any) => console.log(e.target.value)}
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
        defaultValue="098978511"
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
        defaultValue="example@gmail.com"
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
        onPress={() => {}}
      ></CustomButton>
    </View>
  );
};

export default BioEditor;
