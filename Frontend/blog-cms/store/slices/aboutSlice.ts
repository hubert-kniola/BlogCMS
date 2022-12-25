import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface AboutState {
  title: string;
  text: any;
  file?: any;
}

export const initialState: AboutState = {
  title: null,
  text: null,
  file: null,
};

export const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    updateAbout: (state: any, action: PayloadAction<AboutState>) => {
        state.title = action.payload.title;
        state.text = action.payload.text;
        state.file = action.payload.file;
    },
  },
});

export const { updateAbout } = aboutSlice.actions;

export const selectCategory = (state: RootState) => state.about;

export default aboutSlice.reducer;
