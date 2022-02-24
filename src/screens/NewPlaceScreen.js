import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import colors from "../constants/colors";
import { useSelector, useDispatch } from "react-redux";
import { addPlace } from "../store/placesSlice";
import ImgPicker from "../components/ImgPicker";

export default function NewPlaceScreen({ navigation, route }) {
  const [title, setTitle] = useState("");
  const { status } = useSelector((state) => state.places);
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          value={title}
          onChangeText={(value) => setTitle(value)}
        />
        <ImgPicker />
        <Button
          title="Save Place"
          color={colors.secondary}
          onPress={() => {
            dispatch(addPlace({ title }));
            navigation.goBack();
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});
