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
import ImgPicker from "../components/ImgPicker";
import { addPlaceAsync } from "../store/placesSlice";

export default function NewPlaceScreen({ navigation, route }) {
  const [title, setTitle] = useState("");
  const { status } = useSelector((state) => state.places);
  const dispatch = useDispatch();
  const [image, setImage] = useState();

  const imageTakeHandler = (imageUri) => {
    setImage(imageUri);
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          value={title}
          onChangeText={(value) => setTitle(value)}
        />
        <ImgPicker onImageTaken={imageTakeHandler} />
        <Button
          title="Save Place"
          color={colors.secondary}
          onPress={() => {
            dispatch(addPlaceAsync({ title, image }));
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
