import { NativeSelect } from "@mantine/core";
import { sortingList } from "../../../constants/config";
import type { SortValue } from "../../../types/sort";

interface SortProps {
  activeSort: SortValue;
  onChangeSort: (value: SortValue) => void;
}

export const Sort = ({ activeSort, onChangeSort }: SortProps) => {
  return (
    <NativeSelect
      value={activeSort}
      onChange={(e) => onChangeSort(e.currentTarget.value as SortValue)}
      label="Сортировка по:"
      c="blue"
      data={sortingList}
    />
  );
};
