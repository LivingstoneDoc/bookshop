import { NativeSelect } from "@mantine/core";

export const Sort = () => {
  return (
    <NativeSelect
      label="Сортировка по:"
      c="blue"
      data={[
        "Популярности",
        "Наибольшей цене",
        "Наименьшей цене",
        "Алфавиту А-Я",
        "Алфавиту Я-А",
      ]}
    />
  );
};
