import React from "react";
import { View, Text, Button, StyleSheet, Image, Alert } from "react-native";
import colors from "../constants/colors";
import * as ImagePicker from "expo-image-picker";

export default function ImgPicker(props) {
  const getPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA, MEDIA_LIBRARY);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: "Ok" }]
      );
      return false;
    }
    return true;
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
        onPress={async () => {
          const hasPermission = await getPermissions();
          if (!hasPermission) return;
          ImagePicker.launchCameraAsync();
        }}
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
