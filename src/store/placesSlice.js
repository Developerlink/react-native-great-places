import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as FileSystem from "expo-file-system";

const initialState = {
  places: [],
  status: "idle",
};

export const addPlaceAsync = createAsyncThunk(
  "/addPlaceAsync",
  async (data, thunkAPI) => {
    try {
      const fileName = data.image.split("/").pop();
      // console.log(fileName);
      const newPath = FileSystem.documentDirectory + fileName;
      // console.log(FileSystem.documentDirectory);
      // console.log(newPath);
      await FileSystem.moveAsync({
        from: data.image,
        to: newPath,
      });
      return { ...data, image: newPath };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    addPlace: (state, action) => {
      let currentPlaces = state.places;
      currentPlaces.push({
        id: new Date().toISOString(),
        title: action.payload.title,
        image: action.payload.image,
      });
      state.places = currentPlaces;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPlaceAsync.pending, (state) => {
      state.status = "pendingAddPlace";
      console.log(state.status);
    }),
      builder.addCase(addPlaceAsync.fulfilled, (state, action) => {
        console.log("success");
        state.status = "idle";
        console.log(state.status);
      }),
      builder.addCase(addPlaceAsync.rejected, (state) => {
        console.log("failure");
        state.status = "idle";
        console.log(state.status);
      });
  },
});

export const { addPlace } = placesSlice.actions;
export default placesSlice;
