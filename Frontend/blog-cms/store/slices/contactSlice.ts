import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface ContactState {
  id?: string;
  title: string;
  text: string;
  fieldNameOne: string;
  contentOne: string;
  fieldNameTwo: string;
  contentTwo: string;
  fieldNameThree: string;
  contentThree: string;
}

export const initialState: ContactState = {
  id: null,
  title: null,
  text: null,
  fieldNameOne: null,
  contentOne: null,
  fieldNameTwo: null,
  contentTwo: null,
  fieldNameThree: null,
  contentThree: null,
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    updateContact: (state: any, action: PayloadAction<ContactState>) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.text = action.payload.text;
      state.fieldNameOne = action.payload.fieldNameOne;
      state.contentOne = action.payload.contentOne;
      state.fieldNameTwo = action.payload.fieldNameTwo;
      state.contentTwo = action.payload.contentTwo;
      state.fieldNameThree = action.payload.fieldNameThree;
      state.contentThree = action.payload.contentThree;
    },
  },
});

export const { updateContact } = contactSlice.actions;

export const selectCategory = (state: RootState) => state.contact;

export default contactSlice.reducer;
