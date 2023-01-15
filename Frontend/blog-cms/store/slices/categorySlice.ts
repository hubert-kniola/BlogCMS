import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface CategoriesState {
  postsId: string;
  categories: CategoryState[];
}

export interface CategoryState {
  id?: string;
  title: string;
  path: string;
  objectType?: string;
  subCategory?: CategoryState[];
}

export const initialState: CategoriesState = {
  postsId: null,
  categories: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    updateId: (state: any, action: PayloadAction<any>) => {
      state.postsId = action.payload.id;
    },
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
      if (modifyIndex !== undefined) {
        state.categories[modifyIndex].subCategory.push(action.payload.subCategory);
      }
    },
    deleteSubCategory: (state: any, action: PayloadAction<any>) => {
      const modifyIndex = state.categories.findIndex(
        (element: CategoryState) =>
          element.title === action.payload.categoryTitle
      );
      if (modifyIndex !== undefined) {
        state.categories[modifyIndex].subCategory.splice(
          action.payload.indexOfSubCategory,
          1
        );
      }
    },
    addTag: (state: any, action: PayloadAction<any>) => {
      const modifyIndex = state.categories.findIndex(
        (element: CategoryState) =>
          element.title === action.payload.categoryTitle
      );
      if (modifyIndex !== undefined && action.payload.indexOfSubCategory !== undefined) {
        state.categories[modifyIndex].subCategory[
          action.payload.indexOfSubCategory
        ].subCategory.push(action.payload.tag);
      }
    },
    deleteTag: (state: any, action: PayloadAction<any>) => {
      const modifyIndex = state.categories.findIndex(
        (element: CategoryState) =>
          element.title === action.payload.categoryTitle
      );
      if (modifyIndex !== undefined && action.payload.indexOfSubCategory !== undefined) {
        state.categories[modifyIndex].subCategory[
          action.payload.indexOfSubCategory
        ].subCategory.splice(action.payload.indexOfTag, 1);
      }
    },
  },
});

export const {
  updateId,
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
