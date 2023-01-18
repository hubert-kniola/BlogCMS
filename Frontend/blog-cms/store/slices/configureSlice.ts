import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetImageFromAzure } from "../../src/tools";
import { Post, Carousel, FAQ, ContentInput } from "../../src/types";
import type { RootState } from "../store";

export const fetchCarouselImagesByData = createAsyncThunk(
  "about/fetchAboutImageByData",
  async (carousels: Carousel[], thunkAPI) => {
    let carouselsWithFiles = carousels.map(async (element: Carousel) => {
      const response = await GetImageFromAzure(element.imgName);
      const file = new File([response], element.imgName, { type: "image/jpg" });
      return { file: file, ...element };
    });
    return carouselsWithFiles;
  }
);

export interface ConfigureState {
  carousel: Carousel[];
  top3: Post[];
  faq: FAQ[];
  footer: ContentInput[];
  newest: ContentInput;
}

export const initialState: ConfigureState = {
  carousel: [],
  top3: null,
  faq: [],
  footer: null,
  newest: null,
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
    updateNewest: (state: any, action: PayloadAction<any>) => {
      state.newest = action.payload;
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
  extraReducers: (builder) => {
    builder.addCase(
      fetchCarouselImagesByData.fulfilled,
      (state: any, action: any) => {
        let copyOfCarousels: Carousel[] = [...state.carousel];
        copyOfCarousels.map((element, index) => {
          if (element.id === action.payload[index].id) {
            element.file = action.payload[index].file;
            return element;
          }
        });
        state.carousel = copyOfCarousels;
      }
    );
  },
});

export const {
  addCarousel,
  updateCarousel,
  deleteCarousel,
  updateTop3,
  updateNewest,
  addFaq,
  updateFaq,
  deleteFaq,
  updateFooter,
} = configureSlice.actions;

export const selectCategory = (state: RootState) => state.configure;

export default configureSlice.reducer;
