import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface ContactState {
  title: string;
  text: string;
  mail: string;
  phone: string;
  insta: string;
}

export const initialState: ContactState = {
  title: null,
  text: null,
  mail: null,
  phone: null,
  insta: null,
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    updateContact: (state: any, action: PayloadAction<ContactState>) => {
      state.title = action.payload.title;
      state.text = action.payload.text;
      state.mail = action.payload.mail;
      state.phone = action.payload.phone;
      state.insta = action.payload.insta;
    },
  },
});

export const { updateContact } = contactSlice.actions;

export const selectCategory = (state: RootState) => state.contact;

export default contactSlice.reducer;
