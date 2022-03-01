import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as FileSystem from "expo-file-system";
import dbAgent from "../services/db";
import * as MediaLibrary from "expo-media-library";

const initialState = {
  places: [],
  status: "idle",
  pickedLocation: "none",
};

export const addPlaceAsync = createAsyncThunk(
  "/addPlaceAsync",
  async (data, thunkAPI) => {
    const fileName = data.image.split("/").pop();
    // console.log(fileName);
    const newPath = FileSystem.documentDirectory + fileName;
    // console.log(FileSystem.documentDirectory);
    // console.log(newPath);
    const permission = await MediaLibrary.requestPermissionsAsync();
    try {
      if (permission.granted) {
        const asset = await MediaLibrary.createAssetAsync(data.image);
        //console.log(asset);

        // const result = await MediaLibrary.createAlbumAsync("Images", asset, false)
        //   .then(() => {
        //     console.log("File Saved");
        //   })
        //   .catch(() => {
        //     console.log("File not saved");
        //   });

        // console.log(result);
        // await FileSystem.moveAsync({
        //   from: data.image,
        //   to: newPath,
        // });

        const dbResult = await dbAgent.insertPlace(
          asset.id,
          data.title,
          asset.uri,
          "TestStreet 45",
          data.latitude,
          data.longitude
        );
        //console.log(dbResult);

        return {
          id: asset.id,
          title: data.title,
          imageUri: asset.uri,
          latitude: data.latitude,
          longitude: data.longitude,
        };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getPlacesAsync = createAsyncThunk(
  "/getPlacesAsync",
  async (_, thunkAPI) => {
    try {
      const dbResult = await dbAgent.getPlaces();
      //console.log(dbResult.rows._array);
      return dbResult.rows._array;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deletePlacesAsync = createAsyncThunk(
  "/deletePlacesAsync",
  async (_, thunkAPI) => {
    try {
      const result = dbAgent.deletePlaces();
      console.log(result);
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
      currentPlaces.push(action.payload);
      state.places = currentPlaces;
    },
    setLocation: (state, action) => {
      // console.log("inside the slice");
      // console.log(action.payload);
      state.pickedLocation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPlaceAsync.pending, (state) => {
      state.status = "pendingAddPlace";
      console.log(state.status);
    }),
      builder.addCase(addPlaceAsync.rejected, (state) => {
        console.log("failure");
        state.status = "idle";
        console.log(state.status);
      }),
      builder.addCase(addPlaceAsync.fulfilled, (state, action) => {
        let currentPlaces = state.places;
        currentPlaces.push(action.payload);
        //state.places = currentPlaces;
        //console.log(state.places);
        console.log("success");
        state.status = "idle";
        console.log(state.status);
      }),
      builder.addCase(getPlacesAsync.pending, (state) => {
        state.status = "pendingGetPlaces";
        console.log(state.status);
      }),
      builder.addCase(getPlacesAsync.rejected, (state) => {
        console.log("failure");
        state.status = "idle";
        console.log(state.status);
      }),
      builder.addCase(getPlacesAsync.fulfilled, (state, action) => {
        state.places = action.payload;
        //console.log(state.places);
        console.log("success");
        state.status = "idle";
        console.log(state.status);
      }),
      builder.addCase(deletePlacesAsync.pending, (state) => {
        state.status = "pendingDeletePlaces";
        console.log(state.status);
      }),
      builder.addCase(deletePlacesAsync.rejected, (state) => {
        console.log("failure");
        state.status = "idle";
        console.log(state.status);
      }),
      builder.addCase(deletePlacesAsync.fulfilled, (state, action) => {
        state.places = [];
        console.log("success");
        state.status = "idle";
        console.log(state.status);
      });
  },
});

export const { setLocation, addPlace } = placesSlice.actions;
export default placesSlice;
