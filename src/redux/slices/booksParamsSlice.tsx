import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CategoryValue } from "../../types/categories";
import type { SortValue } from "../../types/sort";
import {
  defaultCategory,
  defaultSortingItem,
  PAGINATION,
} from "../../constants/config";

export interface FilterState {
  category: CategoryValue;
  sortValue: SortValue;
  currentPage: number;
  totalPages: number;
}

const initialState: FilterState = {
  category: defaultCategory,
  sortValue: defaultSortingItem,
  currentPage: PAGINATION.DEFAULT_PAGE,
  totalPages: PAGINATION.DEFAULT_PAGE,
};

export const booksParamsSlice = createSlice({
  name: "booksParams",
  initialState,
  reducers: {
    changeCategory: (state, action: PayloadAction<CategoryValue>) => {
      state.category = action.payload;
      state.currentPage = PAGINATION.DEFAULT_PAGE;
    },
    changeSortingValue: (state, action: PayloadAction<SortValue>) => {
      state.sortValue = action.payload;
      state.currentPage = PAGINATION.DEFAULT_PAGE;
    },
    changeCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    changeTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
  },
});

export const {
  changeCategory,
  changeSortingValue,
  changeCurrentPage,
  changeTotalPages,
} = booksParamsSlice.actions;

export default booksParamsSlice.reducer;
