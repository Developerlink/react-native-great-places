import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Image, Alert } from "react-native";
import colors from "../constants/colors";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

export default function ImgPicker(props) {
  const [image, setImage] = useState(null);
  const [cameraPermissionStatus, requestCameraPermission] =
    ImagePicker.useCameraPermissions();

  const getPermissions = async () => {
    //console.log(cameraPermissionStatus);
    if (cameraPermissionStatus.status !== "granted") {
      let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
      //console.log(result);
      if (result.status !== "granted") {
        Alert.alert(
          "Insufficient permissions!",
          "You need to grant camera permissions to use this app.",
          [{ text: "Ok" }]
        );
        return false;
      }
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await getPermissions();
    //console.log(hasPermission);
    if (!hasPermission) return;

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    console.log(image);
    setImage(image.uri);
    props.onImageTaken(image.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!image ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: image }} />
        )}
      </View>
      <Button
        title="Take Image"
        color={colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
