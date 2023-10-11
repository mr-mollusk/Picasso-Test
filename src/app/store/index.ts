import { configureStore } from "@reduxjs/toolkit";
import { postApi } from "features/virtualScroll/api/posts.api";

export const store = configureStore({
  reducer: { [postApi.reducerPath]: postApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});
