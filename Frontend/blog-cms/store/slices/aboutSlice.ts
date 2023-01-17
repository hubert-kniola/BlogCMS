import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetImageFromAzure } from "../../src/tools";
import type { RootState } from "../store";

export const fetchAboutImageByData = createAsyncThunk(
  "about/fetchAboutImageByData",
  async (imgName: string, thunkAPI) => {
    const response = await GetImageFromAzure(imgName);
    return new File([response], imgName, {type: "image/jpg"});
  }
);

export interface AboutState {
  id?: string;
  title: string;
  text: string;
  file?: any;
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
  extraReducers: (builder) => {
    builder.addCase(fetchAboutImageByData.fulfilled, (state, action) => {
      state.file = action.payload;
    });
  },
});

export const { updateAbout } = aboutSlice.actions;

export const selectCategory = (state: RootState) => state.about;

export default aboutSlice.reducer;
