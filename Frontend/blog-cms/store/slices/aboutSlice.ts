import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface AboutState {
  title: string;
  text: string;
  file?: any;
}

export const initialState: AboutState = {
  title: null,
  text: null,
  file: null
};

export const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    updateForm: (state: any, action: PayloadAction<AboutState>) => {
      state.categories = action.payload;
    },
  },
});

export const { updateForm } = aboutSlice.actions;

export const selectCategory = (state: RootState) => state.about;

export default aboutSlice.reducer;
