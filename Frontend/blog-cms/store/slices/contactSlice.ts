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
  file: null,
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    updateContact: (state: any, action: PayloadAction<ContactState>) => {
      state.title = action.payload.title;
      state.text = action.payload.text;
      state.file = action.payload.file;
    },
  },
});

export const { updateContact } = contactSlice.actions;

export const selectCategory = (state: RootState) => state.contact;

export default contactSlice.reducer;
