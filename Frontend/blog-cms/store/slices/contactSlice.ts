import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactForm } from "../../src/types";
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

export interface ContactTypeState {
  contact: ContactState;
  forms: ContactForm[];
}

export const initialState: ContactTypeState = {
  contact: {
    id: null,
    title: null,
    text: null,
    fieldNameOne: null,
    contentOne: null,
    fieldNameTwo: null,
    contentTwo: null,
    fieldNameThree: null,
    contentThree: null,
  },
  forms: [],
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    updateContact: (state: any, action: PayloadAction<ContactState>) => {
      state.contact.id = action.payload.id;
      state.contact.title = action.payload.title;
      state.contact.text = action.payload.text;
      state.contact.fieldNameOne = action.payload.fieldNameOne;
      state.contact.contentOne = action.payload.contentOne;
      state.contact.fieldNameTwo = action.payload.fieldNameTwo;
      state.contact.contentTwo = action.payload.contentTwo;
      state.contact.fieldNameThree = action.payload.fieldNameThree;
      state.contact.contentThree = action.payload.contentThree;
    },
    addContactForm: (state: any, action: PayloadAction<ContactForm[]>) => {
      state.forms = action.payload;
    },
    deleteContactForm: (state: any, action: PayloadAction<any>) => {
      if (state.forms[action.payload.index])
        state.forms.splice(action.payload.index, 1);
    },
  },
});

export const { updateContact, addContactForm, deleteContactForm } = contactSlice.actions;

export const selectCategory = (state: RootState) => state.contact;

export default contactSlice.reducer;
