import React from "react";
import { View, Image, StyleSheet } from "react-native";
import vars from "../../env";

export default function MapPreView(props) {
  let imagePreviewUrl;

  if (props.location) {
    imagePreviewUrl = "";
  }

  return (
    <View style={{...styles.mapPreview, ...props.style }}>
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%"
  }
});
