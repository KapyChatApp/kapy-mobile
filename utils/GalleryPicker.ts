import * as ImagePicker from "expo-image-picker";


export const pickMedia = async () => {

  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    alert("Sorry, we need camera roll permissions to make this work!");
    return [];
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: false,
    quality: 1,
    selectionLimit: 0, 
    allowsMultipleSelection:true
  });

  if (!result.canceled) {

    const selectedAssets = result.assets.map((asset) => ({
      uri: asset.uri,
      type: asset.type || "unknown", 
    }));

    console.log("Selected Assets: ", selectedAssets); 
    return selectedAssets;
  } else {
    console.log("User canceled media picking"); 
    return [];
  }
};

export const singlePickMedia = async ()=>{
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    alert("Sorry, we need camera roll permissions to make this work!");
    return [];
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: false,
    quality: 1,
    selectionLimit: 1, 
  });

  if (!result.canceled) {

    const selectedAssets = result.assets.map((asset) => ({
      uri: asset.uri,
      type: asset.type || "unknown", 
    }));

    console.log("Selected Assets: ", selectedAssets); 
    return selectedAssets;
  } else {
    console.log("User canceled media picking"); 
    return [];
  }
}