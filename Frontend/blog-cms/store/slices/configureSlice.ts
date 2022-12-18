import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post, Carousel, FAQ } from "../../src/types";
import type { RootState } from "../store";

export interface ConfigureState {
  carousel: Carousel[];
  top3: Post[];
  faq: FAQ[];
  footer: any;
}

export const initialState: ConfigureState = {
  carousel: [],
  top3: null,
  faq: [],
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
      if (state.carousel[action.payload.index])
        state.carousel[action.payload.index] = action.payload.carousel;
    },
    deleteCarousel: (state: any, action: PayloadAction<any>) => {
      if (state.carousel[action.payload.index])
        state.carousel.splice(action.payload.index, 1);
    },
    updateTop3: (state: any, action: PayloadAction<any>) => {
      state.top3 = action.payload;
    },
    addFaq: (state: any, action: PayloadAction<FAQ>) => {
      state.faq.push(action.payload);
    },
    updateFaq: (state: any, action: PayloadAction<any>) => {
      if (state.faq[action.payload.index])
        state.faq[action.payload.index] = action.payload.faq;
    },
    deleteFaq: (state: any, action: PayloadAction<any>) => {
      if (state.faq[action.payload.index])
        state.faq.splice(action.payload.index, 1);
    },
    updateFooter: (state: any, action: PayloadAction<any>) => {
      state.footer = action.payload;
    },
  },
});

export const {
  addCarousel,
  updateCarousel,
  deleteCarousel,
  updateTop3,
  addFaq,
  updateFaq,
  deleteFaq,
  updateFooter,
} = configureSlice.actions;

export const selectCategory = (state: RootState) => state.configure;

export default configureSlice.reducer;
