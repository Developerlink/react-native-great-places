import React, { useState } from "react";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import store from "./src/store/store";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import colors from "./src/constants/colors";
import PlacesStackNavigator from "./src/navigation/PlacesStackNavigator";
import { init } from "./src/services/db";

init()
  .then(() => {
    console.log("Initialized database");
  })
  .catch((error) => {
    console.log("Initializing db failed.");
    console.log(error);
  });
enableScreens();

const fetchFontsAsync = async () => {
  await Font.loadAsync({
    "open-sans": require("./src/assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./src/assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontIsLoaded, setFontIsLoaded] = useState(false);

  if (!fontIsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFontsAsync}
        onFinish={() => setFontIsLoaded(true)}
        onError={(error) => console.log(error)}
      />
    );
  }

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={colors.primaryDark}
          style={Platform.OS === "android" ? "light" : "dark"}
        />
        <NavigationContainer>
          <PlacesStackNavigator />
        </NavigationContainer>
      </View>
    </Provider>
  );
}
