import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  places: [],
  status: "idle",
};

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    addPlace: (state, action) => {
      let currentPlaces = state.places;
      currentPlaces.push({
        id: new Date().toISOString(),
        title: action.payload.title,
      });
      state.places = currentPlaces;
    },
  },
});

export const { addPlace } = placesSlice.actions;
export default placesSlice;
