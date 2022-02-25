import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import colors from "../constants/colors";
import defaultHeaderOptions from "../constants/defaultHeaderOptions";
import MapScreen from "../screens/MapScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import PlacesDetailScreen from "../screens/PlaceDetailScreen";
import PlacesListScreen from "../screens/PlacesListScreen";
import TestCamera from "../screens/TestCamera";

const Stack = createNativeStackNavigator();

export default function PlacesStackNavigator({ navigation, route }) {
  return (
    <Stack.Navigator
      initialRouteName="/test"
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? colors.primary : "",
        },
        headerTintColor: Platform.OS === "android" ? "white" : colors.primary,
        ...defaultHeaderOptions,                
      }}
      transi
    >
      <Stack.Screen
        name="/list"
        component={PlacesListScreen}
        options={{ title: "All Places" }}
      />
      <Stack.Screen
        name="/details"
        component={PlacesDetailScreen}
        options={{ title: "Place Details" }}
      />
      <Stack.Screen
        name="/new"
        component={NewPlaceScreen}
        options={{ title: "Add Place" }}
      />
      <Stack.Screen
        name="/map"
        component={MapScreen}
        options={{ title: "Map" }}
      />
      <Stack.Screen
        name="/test"
        component={TestCamera}
        options={{ title: "Test" }}
      />
    </Stack.Navigator>
  );
}
