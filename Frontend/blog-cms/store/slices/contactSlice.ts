import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface ContactState {
  title: string;
  text: string;
  file?: any;
}

export const initialState: ContactState = {
  title: null,
  text: null,
  file: null
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    updateForm: (state: any, action: PayloadAction<ContactState>) => {
      state.categories = action.payload;
    },
  },
});

export const { updateForm } = contactSlice.actions;

export const selectCategory = (state: RootState) => state.contact;

export default contactSlice.reducer;
