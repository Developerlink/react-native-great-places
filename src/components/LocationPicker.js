import React, { useState, useCallback, useEffect } from "react";
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
import { useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { setLocation } from "../store/placesSlice";

export default function LocationPicker(props) {
  const [localLocation, setLocalLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const { pickedLocation } = useSelector((state) => state.places);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pickedLocation !== "none") {
      //console.log(pickedLocation);
      setLocalLocation(pickedLocation);
    }
  }, [pickedLocation, props.onLocationPicked]);

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
      let location = {
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
      location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Low,
      });

      dispatch(
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
      );
      //console.log(location);
    } catch (error) {
      Alert.alert(
        "Could not fetch location",
        "Please try again or pick a location on the map.",
        [{ text: "OK" }]
      );
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate("/map");
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreView style={styles.mapPreview} location={pickedLocation}>
        {isFetching ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <Text>No coordinates chosen yet</Text>
        )}
      </MapPreView>
      <View style={styles.actions}>
        <Button
          title="Get user location"
          color={colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on map"
          color={colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
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
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
