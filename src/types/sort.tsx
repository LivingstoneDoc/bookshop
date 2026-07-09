export const SORT_VALUES = {
  RATING: "rating",
  PRICE_DESC: "price_desc",
  PRICE_ASC: "price_asc",
  TITLE_ASC: "title_asc",
  TITLE_DESC: "title_desc",
} as const;

export type SortValue = (typeof SORT_VALUES)[keyof typeof SORT_VALUES];

export interface SortOption {
  value: SortValue;
  label: string;
}
