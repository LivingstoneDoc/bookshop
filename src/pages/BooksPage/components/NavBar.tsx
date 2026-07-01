import { Button, Group } from "@mantine/core";
import { useState } from "react";

const sortingList = [
  { id: "1", label: "Все", value: "all" },
  { id: "2", label: "Саморазвитие", value: "self-development" },
  { id: "3", label: "Детектив", value: "detective" },
  { id: "4", label: "Русская Проза", value: "russian-prose" },
  { id: "5", label: "Зарубежная Проза", value: "foreign-prose" },
  { id: "6", label: "IT", value: "it" },
];

export const NavBar = () => {
  const [isActive, setIsActive] = useState(0);
  const handleCategoryClick = (index: number) => {
    setIsActive(index);
  };
  return (
    <Group justify="flex-start" align="center" gap="xs">
      {sortingList.map((item, i) => (
        <Button
          key={item.id}
          onClick={() => handleCategoryClick(i)}
          color="blue"
          variant={isActive === i ? "filled" : "subtle"}
        >
          {item.label}
        </Button>
      ))}
    </Group>
  );
};
