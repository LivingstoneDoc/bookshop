import { NativeSelect } from "@mantine/core";
import { sortingList } from "../../../constants/config";
import type { SortValue } from "../../../types/sort";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { changeSortingValue } from "../../../redux/slices/filterSlice";

export const Sort = () => {
  const activeSort = useSelector((state: RootState) => state.filter.sortValue);
  const dispatch = useDispatch();
  return (
    <NativeSelect
      value={activeSort}
      onChange={(e) =>
        dispatch(changeSortingValue(e.currentTarget.value as SortValue))
      }
      label="Сортировка по:"
      c="blue"
      data={sortingList}
    />
  );
};
