import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface CategoriesState {
    categories: CategoryState[];
}

export interface CategoryState {
  title: string;
  url: string;
  subMenu?: CategoryState[];
}

export const initialState: CategoriesState = {
  categories: []
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    updateMenu: (state: any, action: PayloadAction<CategoriesState>) => {
      state.categories = action.payload.categories;
    },
  },
});

export const { updateMenu } = categorySlice.actions;

export const selectCategory = (state: RootState) => state.category;

export default categorySlice.reducer;
