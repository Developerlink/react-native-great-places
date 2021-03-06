import React, { useEffect, useState } from "react";
import { Image, View, Text, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";

const initialState = {
  imageUri: "test",
  title: "",
  latitude: "",
  longitude: "",
};

export default function PlacesDetailScreen({ navigation, route }) {
  const [place, setPlace] = useState(initialState);
  const { places } = useSelector((state) => state.places);
  // console.log(places);

  useEffect(() => {
    const { id } = route.params;
    //console.log(id);
    const place = places.find((place) => place.id === id);
    //console.log(place);
    setPlace(place);
  }, [places]);

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.locationContainer}>
        <View>
          <Text style={styles.title}>{place.title}</Text>
        </View>
        <Text>Latitude: {place.latitude}</Text>
        <Text>Longitude: {place.longitude}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: "30%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc",
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 24,
  },
});
