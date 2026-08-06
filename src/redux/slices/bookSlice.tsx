import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Book } from "../../types/book";
import { BOOKS, PAGINATION } from "../../constants/config";
import { API_ENDPOINTS } from "../../constants/endpoints";
import { checkBooksSearch } from "../../utils/bookUtils";
import type { CategoryValue } from "../../types/categories";
import { ERROR_MESSAGES } from "../../constants/messages";
import { getErrorMessage } from "../../utils/errorUtils";

interface FetchBooksParams {
  activeCategoryValue: CategoryValue;
  activeSortValue: string;
  currentPage: number;
  searchValue: string;
}

interface FetchBooksResponse {
  items: Book[];
  totalPages: number;
}

type Status = "loading" | "success" | "error";

interface BookState {
  items: Book[];
  totalPages: number;
  status: Status;
  error: string | null;
}

export const fetchBooks = createAsyncThunk<
  FetchBooksResponse,
  FetchBooksParams,
  { rejectValue: string }
>("book/fetchBooks", async (params, ThunkAPI) => {
  const { activeCategoryValue, activeSortValue, currentPage, searchValue } =
    params;
  const normalizedInputSearch = (searchValue || "").trim();
  try {
    const url = new URL(API_ENDPOINTS.BOOKS.GET_ALL);

    if (activeCategoryValue !== null) {
      url.searchParams.append("category", String(activeCategoryValue));
    }

    if (activeSortValue.includes("_")) {
      const [sortBy, order] = activeSortValue.split("_");
      url.searchParams.append("sortBy", sortBy);
      url.searchParams.append("order", order);
    } else {
      url.searchParams.append("sortBy", activeSortValue);
      url.searchParams.append("order", "desc");
    }

    if (normalizedInputSearch !== "") {
      url.searchParams.append("search", normalizedInputSearch);
    }

    const fullResponse = await fetch(url.toString());
    if (!fullResponse.ok) {
      return ThunkAPI.rejectWithValue(
        getErrorMessage(fullResponse.status, "books"),
      );
    }
    let allItems = await fullResponse.json();
    allItems = checkBooksSearch(allItems, normalizedInputSearch);
    const totalCount = Array.isArray(allItems) ? allItems.length : 0;
    const calculatedTotalPages = Math.ceil(
      totalCount / PAGINATION.ITEMS_PER_PAGE,
    );

    if (totalCount === 0) {
      return {
        items: BOOKS.DEFAULT_ITEMS,
        totalPages: 0,
      };
    }

    const paginatedUrl = new URL(url.toString());
    paginatedUrl.searchParams.append("page", String(currentPage));
    paginatedUrl.searchParams.append(
      "limit",
      String(PAGINATION.ITEMS_PER_PAGE),
    );

    const response = await fetch(paginatedUrl.toString());
    if (!response.ok) {
      return ThunkAPI.rejectWithValue(getErrorMessage(response.status, "page"));
    }
    let data = await response.json();
    data = checkBooksSearch(data, normalizedInputSearch);
    return {
      items: Array.isArray(data) ? data : BOOKS.DEFAULT_ITEMS,
      totalPages: calculatedTotalPages,
    };
  } catch (error) {
    console.error("Error fetching books:", error);
    if (error instanceof Error) {
      return ThunkAPI.rejectWithValue(error.message);
    }
    return ThunkAPI.rejectWithValue(ERROR_MESSAGES.COMMON);
  }
});

const initialState: BookState = {
  items: BOOKS.DEFAULT_ITEMS,
  totalPages: PAGINATION.DEFAULT_PAGE,
  status: "loading",
  error: null,
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.status = "loading";
      state.totalPages = 0;
      state.error = null;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.status = "success";
      state.items = action.payload.items;
      state.totalPages = action.payload.totalPages;
      state.error = null;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.items = BOOKS.DEFAULT_ITEMS;
      state.totalPages = 0;
      state.status = "error";
      state.error = action.payload as string;
    });
  },
});

export const {} = bookSlice.actions;

export default bookSlice.reducer;
