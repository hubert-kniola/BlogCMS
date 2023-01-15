import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface AboutState {
  id?: string;
  title: string;
  text: string;
  file?: File;
  imgName?: string;
}

export const initialState: AboutState = {
  id: null,
  title: null,
  text: null,
  file: null,
  imgName: null,
};

export const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    updateAbout: (state: any, action: PayloadAction<any>) => {
        state.id = action.payload.id;
        state.title = action.payload.title;
        state.text = action.payload.text;
        state.imgName = action.payload.imgName;
        state.file = action.payload.file;
    },
  },
});

export const { updateAbout } = aboutSlice.actions;

export const selectCategory = (state: RootState) => state.about;

export default aboutSlice.reducer;
