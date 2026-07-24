import type { Book } from "../types/book";

export const checkBooksSearch = (books: Book[], searchStr: string): Book[] => {
  if (!searchStr) return books;
  const lowCaseSearchString = searchStr.toLowerCase();

  return books.filter((book) => {
    const titleParam = book.title?.toLowerCase().includes(lowCaseSearchString);
    const authorParam = book.title?.toLowerCase().includes(lowCaseSearchString);
    return titleParam || authorParam;
  });
};
