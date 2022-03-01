import React from "react";
import {Text, View, Image, StyleSheet } from "react-native";

export default function MapPreView(props) {
  let imagePreviewUrl;

  if (props.location) {
    imagePreviewUrl = "";
  }

  return (
    <View style={{...styles.mapPreview, ...props.style }}>
      {props.location !== "none" ? (
        <View>
        <Text>lat: {props.location.latitude}</Text>
        <Text>long: {props.location.longitude}</Text>
        </View>
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
