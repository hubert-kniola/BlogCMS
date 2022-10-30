import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface UserState {
  email: string;
  userName: string;
  password: string;
  token: string;
  refreshToken: string;
}

const initialState: UserState = {
    email: null,
    userName: null,
    password: null,
    token: null,
    refreshToken: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state: any, action: PayloadAction<UserState>) => {
        state.email = action.payload.email;
        state.userName = action.payload.userName;
        state.password = action.payload.password;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
    },
    updateToken: (state: any, action: PayloadAction<UserState>) => {
        state.token = action.payload.token;
    },
  },
});

export const { updateUser, updateToken } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
