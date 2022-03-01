import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { useSelector, useDispatch } from "react-redux";
import PlaceItem from "../components/PlaceItem";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { getPlacesAsync } from "../store/placesSlice";

export default function PlacesListScreen({ navigation, route }) {
  const { places } = useSelector((state) => state.places);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="menu"
            iconName="add-box"
            IconComponent={MaterialIcons}
            onPress={() => navigation.navigate("/new")}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  useEffect(() => {
    dispatch(getPlacesAsync());
  }, [dispatch])

  return (
    <FlatList
      data={places}
      renderItem={(itemData) => (
        <PlaceItem
          imageUri={itemData.item.imageUri}
          title={itemData.item.title}
          address={itemData.item.latitude}
          onSelect={() =>
            navigation.navigate("/details", { id: itemData.item.id })
          }
        />
      )}
    />
  );
}

const styles = StyleSheet.create({});
