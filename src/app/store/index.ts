import { configureStore } from "@reduxjs/toolkit";
import { postApi } from "entities/post/api/post.api";

export const store = configureStore({
  reducer: { [postApi.reducerPath]: postApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});
