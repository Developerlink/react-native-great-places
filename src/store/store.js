import { configureStore } from "@reduxjs/toolkit";
import placesSlice from "./placesSlice";

const store = configureStore({
  reducer: {
    places: placesSlice.reducer,
  },
});

export default store;
