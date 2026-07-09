import type { CategoryId } from "./categories";

export interface Book {
  id: string;
  title: string;
  author: string;
  bookCover: string;
  coverTypesIndex: number[];
  bookFormats: string[];
  category: CategoryId;
  price: number;
}
