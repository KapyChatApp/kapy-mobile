import { View, Text } from "react-native";
import React, { useState } from "react";
import EditableField from "@/components/ui/EditableField";
import CustomButton from "@/components/ui/CustomButton";
import Popover, { PopoverPlacement } from "react-native-popover-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import EditablePopover from "@/components/ui/EditablePopover";
import { Genders } from "@/constants/UiItems";

const BioEditor = () => {
  const [gender, setGender] = useState("Male");
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
            height={35}
            defaultValue="Recent name"
            onChangeText={(e: any) => console.log(e.target.value)}
          />
        </View>
        <View className="flex-1">
          <EditableField
            label="Lastname:"
            width="100%"
            height={35}
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
            height={35}
            defaultValue="Recent name"
            onChangeText={(e: any) => console.log(e.target.value)}
          />
        </View>
        <View className="flex-1">
          <EditablePopover
            label="Gender"
            width="100%"
            height={35}
            data={gender}
            setData={setGender}
            values={Genders}
          />
        </View>
      </View>

      <EditableField
        label="Label:"
        width="100%"
        height={35}
        defaultValue="Default value"
        onChangeText={(e: any) => console.log(e.target.value)}
      />
      <EditableField
        label="Label:"
        width="100%"
        height={35}
        defaultValue="Default value"
        onChangeText={(e: any) => console.log(e.target.value)}
      />
      <EditableField
        label="Label:"
        width="100%"
        height={35}
        defaultValue="Default value"
        onChangeText={(e: any) => console.log(e.target.value)}
      />
      <EditableField
        label="Label:"
        width="100%"
        height={35}
        defaultValue="Default value"
        onChangeText={(e: any) => console.log(e.target.value)}
      />
      <EditableField
        label="Label:"
        width="100%"
        height={35}
        defaultValue="Default value"
        onChangeText={(e: any) => console.log(e.target.value)}
      />
      <EditableField
        label="Label:"
        width="100%"
        height={35}
        defaultValue="Default value"
        isAlwaysReadOnly={true}
        onChangeText={(e: any) => console.log(e.target.value)}
      />
      <EditableField
        label="Label:"
        width="100%"
        height={35}
        defaultValue="Default value"
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
