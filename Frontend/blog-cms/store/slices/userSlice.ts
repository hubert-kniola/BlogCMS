import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface UserState {
  email: string;
  password: string;
  token: string;
}

const initialState: UserState = {
    email: null,
    password: null,
    token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state: any, action: PayloadAction<UserState>) => {
        state = action.payload;
    },
    updateToken: (state: any, action: PayloadAction<UserState>) => {
        state.token = action.payload.token;
    },
  },
});

export const { updateUser, updateToken } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
