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
  categories: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    updateMenu: (state: any, action: PayloadAction<CategoriesState>) => {
      state.categories = action.payload.categories;
    },
    addCategory: (state: any, action: PayloadAction<CategoryState>) => {
      state.categories = [...state.categories, action.payload];
    },
    deleteCategory: (
      state: any,
      action: PayloadAction<CategoryState>
    ): void => {
      const modifyIndex = state.categories.findIndex(
        (element: CategoryState) => element.title === action.payload.title
      );
      state.categories.splice(modifyIndex, 1);
    },
    addSubCategory: (state: any, action: PayloadAction<any>) => {
      const modifyIndex = state.categories.findIndex(
        (element: CategoryState) =>
          element.title === action.payload.categoryTitle
      );
      console.log(state.categories[modifyIndex].subMenu);
      if (modifyIndex) {
        state.categories[modifyIndex].subMenu.push(
          action.payload.subCategory
        );
      }
    },
    deleteSubCategory: (state: any, action: PayloadAction<any>) => {
      const modifyIndex = state.categories.findIndex(
        (element: CategoryState) =>
          element.title === action.payload.categoryTitle
      );
      const modifySubIndex = state.categories[modifyIndex].subMenu.findIndex(
        (element: CategoryState) =>
          element.title === action.payload.subCategoryTitle
      );
      if (modifyIndex) {
        state.categories[modifyIndex].subMenu.splice(modifySubIndex, 1);
      }
    },
    addTag: (state: any, action: PayloadAction<any>) => {
      const modifyIndex = state.categories.findIndex(
        (element: CategoryState) =>
          element.title === action.payload.categoryTitle
      );
      const modifySubIndex = state.categories[modifyIndex].subMenu.findIndex(
        (element: CategoryState) =>
          element.title === action.payload.subCategoryTitle
      );

      if (modifyIndex && modifySubIndex) {
        state.categories[modifyIndex].subMenu[modifySubIndex].subMenu.push(
          action.payload.tag
        );
      }
    },
    deleteTag: (state: any, action: PayloadAction<any>) => {
      const modifyIndex = state.categories.findIndex(
        (element: CategoryState) =>
          element.title === action.payload.categoryTitle
      );
      const modifySubIndex = state.categories[modifyIndex].subMenu.findIndex(
        (element: CategoryState) =>
          element.title === action.payload.subCategoryTitle
      );
      const modifyTagIndex = state.categories[modifyIndex].subMenu[
        modifySubIndex
      ].subMenu.findIndex(
        (element: CategoryState) => element.title === action.payload.tagTitle
      );
      if (modifyIndex && modifySubIndex) {
        state.categories[modifyIndex].subMenu[modifySubIndex].subMenu.splice(
          modifyTagIndex,
          1
        );
      }
    },
  },
});

export const {
  updateMenu,
  addCategory,
  addSubCategory,
  addTag,
  deleteCategory,
  deleteSubCategory,
  deleteTag,
} = categorySlice.actions;

export const selectCategory = (state: RootState) => state.category;

export default categorySlice.reducer;
