import { useSearchParams } from "react-router";
import { defaultSortingItem, PAGINATION } from "../constants/config";

const QUERY_KEYS = {
  CATEGORY: "category",
  SORT: "sort",
  PAGE: "page",
  SEARCH: "search",
} as const;

type QueryValuesType = (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS];
type UrlParamsType = Partial<Record<QueryValuesType, string | number | null>>;

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategoryValue = searchParams.get(QUERY_KEYS.CATEGORY);
  const activeSortValue =
    searchParams.get(QUERY_KEYS.SORT) || defaultSortingItem;
  const currentPage =
    Number(searchParams.get(QUERY_KEYS.PAGE)) || PAGINATION.DEFAULT_PAGE;
  const searchValue = searchParams.get(QUERY_KEYS.SEARCH) || "";
  const updateUrlParams = (newParams: UrlParamsType) => {
    const currentParams = Object.fromEntries([...searchParams]);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === "") {
        delete currentParams[key];
      } else {
        currentParams[key] = String(value);
      }
    });
    setSearchParams(currentParams);
  };

  const setActiveCategoryValue = (value: string | number | null) => {
    updateUrlParams({
      [QUERY_KEYS.CATEGORY]: value,
      [QUERY_KEYS.PAGE]: PAGINATION.DEFAULT_PAGE,
    });
  };

  const setActiveSortValue = (value: string) => {
    updateUrlParams({
      [QUERY_KEYS.SORT]: value,
      [QUERY_KEYS.PAGE]: PAGINATION.DEFAULT_PAGE,
    });
  };

  const setCurrentPage = (value: number) => {
    updateUrlParams({ [QUERY_KEYS.PAGE]: value });
  };

  const setSearchValue = (value: string) => {
    updateUrlParams({
      [QUERY_KEYS.SEARCH]: value,
      [QUERY_KEYS.PAGE]: PAGINATION.DEFAULT_PAGE,
    });
  };

  return {
    activeCategoryValue,
    activeSortValue,
    currentPage,
    searchValue,
    setActiveCategoryValue,
    setActiveSortValue,
    setCurrentPage,
    setSearchValue,
  };
};
