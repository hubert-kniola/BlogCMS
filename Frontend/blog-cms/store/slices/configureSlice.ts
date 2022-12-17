import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../src/types";
import type { RootState } from "../store";
import { Carousel } from "../../src/types/baseTypes"

export interface ConfigureState {
  carousel: Carousel[];
  top3: Post[];
  footer: any;
}

export const initialState: ConfigureState = {
  carousel: [],
  top3: null,
  footer: null,
};

export const configureSlice = createSlice({
  name: "configure",
  initialState,
  reducers: {
    addCarousel: (state: any, action: PayloadAction<Carousel>) => {
      state.carousel.push(action.payload);
    },
    updateCarousel: (state: any, action: PayloadAction<any>) => {
      if (state.posts[action.payload.index])
        state.carousel[action.payload.index] = action.payload.carousel;
    },
    deleteCarousel: (state: any, action: PayloadAction<any>) => {
      if (state.posts[action.payload.index])
        state.carousel.splice(action.payload.index, 1);
    },
    updateTop3: (state: any, action: PayloadAction<any>) => {
        state.top3 = action.payload;
    },
    updateFooter: (state: any, action: PayloadAction<any>) => {
        state.footer = action.payload;
    },
  },
});

export const { addCarousel, updateCarousel, deleteCarousel, updateTop3, updateFooter } = configureSlice.actions;

export const selectCategory = (state: RootState) => state.configure;

export default configureSlice.reducer;
