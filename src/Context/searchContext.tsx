import { createContext, useContext } from "react";

export interface SearchContextProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export const SearchContext = createContext<SearchContextProps | undefined>(
  undefined,
);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch должен использоваться внутри SearchProvider");
  }
  return context;
};
