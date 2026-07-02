import { NativeSelect } from "@mantine/core";

const sortingList = [
  { value: "popular", label: "Популярности" },
  { value: "price_desc", label: "Наибольшей цене" },
  { value: "price_asc", label: "Наименьшей цене" },
  { value: "title_asc", label: "Алфавиту А-Я" },
  { value: "title_desc", label: "Алфавиту Я-А" },
];

export const Sort = () => {
  return <NativeSelect label="Сортировка по:" c="blue" data={sortingList} />;
};
