export const CATEGORIES = {
  SelfDevelopment: 1,
  Detective: 2,
  RussianProse: 3,
  ForeignProse: 4,
  IT: 5,
} as const;

export type CategoryId = (typeof CATEGORIES)[keyof typeof CATEGORIES];

export type CategoryValue = CategoryId | null;

export interface CategoryOption {
  label: string;
  value: CategoryValue;
}
