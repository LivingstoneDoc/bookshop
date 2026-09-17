import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CART } from "../../constants/config";
import type { CartItemProps } from "../../types/cart";
import type { RootState } from "../store";
import {
  calcTotalPrice,
  getCartDataFromLocalStorage,
} from "../../utils/cartUtils";

export interface cartState {
  cartItems: CartItemProps[];
  totalPrice: number;
}

const { cartItems, totalPrice } = getCartDataFromLocalStorage();

const initialState: cartState = {
  cartItems,
  totalPrice,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<CartItemProps>) => {
      const foundItem = state.cartItems.find(
        (item) => item.id === action.payload.id,
      );
      if (foundItem) {
        foundItem.count++;
      } else {
        state.cartItems.push({
          ...action.payload,
          count: CART.DEFAULT_AMOUNT,
        });
      }
      state.totalPrice = calcTotalPrice(state.cartItems);
    },
    incrementBookCount: (state, action: PayloadAction<string>) => {
      const foundBook = state.cartItems.find(
        (item) => item.id === action.payload,
      );
      if (foundBook) {
        foundBook.count++;
        state.totalPrice = calcTotalPrice(state.cartItems);
      }
    },
    decrementBookCount: (state, action: PayloadAction<string>) => {
      const foundBook = state.cartItems.find(
        (item) => item.id === action.payload,
      );
      if (foundBook) {
        foundBook.count--;
        state.totalPrice = calcTotalPrice(state.cartItems);
      }
    },
    removeBook: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload,
      );
      state.totalPrice = calcTotalPrice(state.cartItems);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = calcTotalPrice(state.cartItems);
    },
  },
});

export const cartSelector = (state: RootState) => state.cart;

export const {
  addBook,
  incrementBookCount,
  decrementBookCount,
  removeBook,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
