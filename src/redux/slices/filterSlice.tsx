import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CategoryValue } from "../../types/categories";
import type { SortValue } from "../../types/sort";
import { defaultCategory, defaultSortingItem } from "../../constants/config";

export interface FilterState {
  category: CategoryValue;
  sortValue: SortValue;
}

const initialState: FilterState = {
  category: defaultCategory,
  sortValue: defaultSortingItem,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeCategory: (state, action: PayloadAction<CategoryValue>) => {
      state.category = action.payload;
    },
    changeSortingValue: (state, action: PayloadAction<SortValue>) => {
      state.sortValue = action.payload;
    },
  },
});

export const { changeCategory, changeSortingValue } = filterSlice.actions;

export default filterSlice.reducer;
