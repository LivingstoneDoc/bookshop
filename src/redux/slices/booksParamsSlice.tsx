import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PAGINATION } from "../../constants/config";

export interface booksParamsState {
  totalPages: number;
}

const initialState: booksParamsState = {
  totalPages: PAGINATION.DEFAULT_PAGE,
};

export const booksParamsSlice = createSlice({
  name: "booksParams",
  initialState,
  reducers: {
    changeTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
  },
});

export const { changeTotalPages } = booksParamsSlice.actions;

export default booksParamsSlice.reducer;
