import { configureStore } from "@reduxjs/toolkit";
import booksParamsReducer from "./slices/booksParamsSlice";

export const store = configureStore({
  reducer: {
    params: booksParamsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
