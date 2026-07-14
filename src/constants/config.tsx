import { CATEGORIES, type CategoryOption } from "../types/categories";
import { SORT_VALUES, type SortOption } from "../types/sort";

export const roubleSign = "\u20bd";

export const categoriesList: CategoryOption[] = [
  { label: "Все", value: null },
  {
    label: "Саморазвитие",
    value: CATEGORIES.SelfDevelopment,
  },
  { label: "Детектив", value: CATEGORIES.Detective },
  {
    label: "Русская Проза",
    value: CATEGORIES.RussianProse,
  },
  {
    label: "Зарубежная Проза",
    value: CATEGORIES.ForeignProse,
  },
  { label: "IT", value: CATEGORIES.IT },
];

export const defaultCategory = categoriesList[0].value;

export const sortingList: SortOption[] = [
  { value: SORT_VALUES.RATING, label: "Популярности" },
  { value: SORT_VALUES.PRICE_DESC, label: "Наибольшей цене" },
  { value: SORT_VALUES.PRICE_ASC, label: "Наименьшей цене" },
  { value: SORT_VALUES.TITLE_ASC, label: "Алфавиту А-Я" },
  { value: SORT_VALUES.TITLE_DESC, label: "Алфавиту Я-А" },
];

export const defaultSortingItem = sortingList[0].value;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  ITEMS_PER_PAGE: 8,
  TOTAL_ITEMS: 10,
};
