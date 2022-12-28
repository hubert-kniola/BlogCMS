import { configureStore } from "@reduxjs/toolkit";
import { categorySlice } from "./slices/categorySlice";
import { userSlice } from "./slices/userSlice";
import { aboutSlice } from "./slices/aboutSlice";
import { contactSlice } from "./slices/contactSlice";
import { postSlice } from "./slices/postSlice";
import { configureSlice } from "./slices/configureSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    category: categorySlice.reducer,
    about: aboutSlice.reducer,
    contact: contactSlice.reducer,
    post: postSlice.reducer,
    configure: configureSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
