import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import colors from "../constants/colors";
import * as Location from "expo-location";
import MapPreView from "./MapPreview";

export default function LocationPicker(props) {
  const [location, setLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const getPermissions = async () => {
    let result = await Location.requestForegroundPermissionsAsync();
    //console.log(result);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant permission to access location.",
        [{ text: "Ok" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await getPermissions();
    if (!hasPermission) return;
    try {
      setIsFetching(true);
      let currentLocation = {
        coords: {
          accuracy: 11.470999717712402,
          altitude: 58,
          altitudeAccuracy: 1.3277778625488281,
          heading: 0,
          latitude: 37.352166379,
          longitude: -122.009842285,
          speed: 0,
        },
        mocked: false,
        timestamp: 1646051471197,
      };
      //currentLocation = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Low});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
      console.log(currentLocation);
    } catch (error) {
      Alert.alert(
        "Could not fetch location",
        "Please try again or pick a location on the map.",
        [{ text: "OK" }]
      );
    }
    setIsFetching(false);
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreView style={styles.mapPreview} location={location} >
        {isFetching ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <Text>No location chosen yet</Text>
        )}
      </MapPreView>
      <Button
        title="Get user location"
        color={colors.primary}
        onPress={getLocationHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
    marginTop: 15,
    alignItems: "center",
  },
  mapPreview: {
    marginBottom: 15,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});
