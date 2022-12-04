import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../src/types";
import type { RootState } from "../store";

export interface ConfigureState {
  carousel: any;
  top3: Post[];
  footer: any;
}

export const initialState: ConfigureState = {
  carousel: null,
  top3: null,
  footer: null,
};

export const configureSlice = createSlice({
  name: "configure",
  initialState,
  reducers: {
    updateCarousel: (state: any, action: PayloadAction<any>) => {
        state.carousel = action.payload;
    },
    updateTop3: (state: any, action: PayloadAction<any>) => {
        state.top3 = action.payload;
    },
    updateFooter: (state: any, action: PayloadAction<any>) => {
        state.footer = action.payload;
    },
  },
});

export const { updateCarousel, updateTop3, updateFooter } = configureSlice.actions;

export const selectCategory = (state: RootState) => state.configure;

export default configureSlice.reducer;
