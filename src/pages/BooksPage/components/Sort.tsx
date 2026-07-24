import { NativeSelect } from "@mantine/core";
import { sortingList } from "../../../constants/config";
import { useQueryParams } from "../../../hooks/useQueryParams";

export const Sort = () => {
  const { activeSortValue, setActiveSortValue } = useQueryParams();
  return (
    <NativeSelect
      value={activeSortValue}
      onChange={(e) => setActiveSortValue(e.currentTarget.value)}
      label="Сортировка по:"
      c="blue"
      data={sortingList}
    />
  );
};
