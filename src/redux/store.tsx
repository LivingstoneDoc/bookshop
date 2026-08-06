import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import bookReducer from "./slices/bookSlice";

export const store = configureStore({
  reducer: {
    book: bookReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
