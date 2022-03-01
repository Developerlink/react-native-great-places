import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { Ionicons } from "@expo/vector-icons";
import { setLocation, addPlace } from "../store/placesSlice";
import { useDispatch, useSelector } from "react-redux";

export default function MapScreen({ navigation, route }) {
  const region = {
    latitude: 55.3811,
    longitude: 10.4101,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const [selectedLocation, setSelectedLocation] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="SAVE"
            iconName=""
            IconComponent={Ionicons}
            onPress={() => {
              if (!selectedLocation) return;
              //dispatch(addPlace({id: new Date().toISOString(), ...selectedLocation}));
              dispatch(setLocation(selectedLocation));
               navigation.navigate("/new");
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [selectedLocation]);

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    };
  }

  const selectLocationHandler = (event) => {
    // console.log(event);
    setSelectedLocation(event.nativeEvent.coordinate);
  };

  return (
    <MapView style={styles.map} region={region} onPress={selectLocationHandler}>
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
