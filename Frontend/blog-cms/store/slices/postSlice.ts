import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Post } from "../../src/types";

export interface PostState {
  posts: Post[];
}

export const initialState: PostState = {
  posts: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state: any, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
    updatePost: (state: any, action: PayloadAction<any>) => {
      if (state.posts[action.payload.index])
        state.posts[action.payload.index] = action.payload.post;
    },
    deletePost: (state: any, action: PayloadAction<any>) => {
      const modifyIndex = state.posts.findIndex(
        (element: Post) => element.title === action.payload.title
      );
      state.posts.splice(modifyIndex, 1);
    },
  },
});

export const { addPost, updatePost, deletePost } = postSlice.actions;

export const selectCategory = (state: RootState) => state.post;

export default postSlice.reducer;
