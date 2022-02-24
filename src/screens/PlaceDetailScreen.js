import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PlacesDetailScreen({ navigation, route }) {
  const [id, setId] = useState("");
  useEffect(() => {
    const { id } = route.params;
    setId(id);
  }, []);

  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
