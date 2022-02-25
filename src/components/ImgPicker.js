import React from "react";
import { View, Text, Button, StyleSheet, Image, Alert, PermissionsAndroid } from "react-native";
import colors from "../constants/colors";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from 'expo-media-library';
import { Camera } from "expo-camera";

export default function ImgPicker(props) {
  const [cameraPermissionStatus, requestCameraPermission] =
    ImagePicker.useCameraPermissions();
  const [mediaLibraryPermissionStatus, requestMediaLibraryPermission] =
    ImagePicker.useMediaLibraryPermissions();

  const getPermissions = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log(result);

    if (result.granted === false) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: "Ok" }]
      );
      return false;
    } 
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await getPermissions();
    if (!hasPermission) return;
    ImagePicker.launchCameraAsync({
      
    });
  };

  return (
    <View style={styles.imagePicer}>
      <View style={styles.imagePreview}>
        <Text>No image picked yet.</Text>
        <Image style={styles.image} />
      </View>
      <Button
        title="Take Image"
        color={colors.secondary}
        onPress={takeImageHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imagePicer: {
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
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
