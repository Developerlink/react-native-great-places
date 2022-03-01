import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Alert,
} from "react-native";
import colors from "../constants/colors";
import { useSelector, useDispatch } from "react-redux";
import ImgPicker from "../components/ImgPicker";
import { addPlaceAsync, deletePlacesAsync } from "../store/placesSlice";
import LocationPicker from "../components/LocationPicker";
import env from "../../env";

export default function NewPlaceScreen({ navigation, route }) {
  const [title, setTitle] = useState("");
  const { status, pickedLocation } = useSelector((state) => state.places);
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
        <LocationPicker navigation={navigation} route={route} />
        <View style={styles.button}>
          <Button
            title="Save Place"
            color={colors.secondary}
            onPress={() => {
              //dispatch(deletePlacesAsync());
              if (pickedLocation === "none") {
                Alert.alert(
                  "A location is missing",
                  "You need to get a location before you can save",
                  [{ text: "Ok" }]
                );
              } else {
                dispatch(addPlaceAsync({ title, image, ...pickedLocation }));
                navigation.goBack();
              }
            }}
          />
        </View>
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
  button: {
    marginTop: 15,
  },
});
