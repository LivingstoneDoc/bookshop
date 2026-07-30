import { configureStore } from "@reduxjs/toolkit";
import booksParamsReducer from "./slices/booksParamsSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    params: booksParamsReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
