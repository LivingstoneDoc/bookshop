import { Button, Group } from "@mantine/core";
import { useState } from "react";

const categoriesList = [
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
      {categoriesList.map((category, i) => (
        <Button
          key={category.id}
          onClick={() => handleCategoryClick(i)}
          color="blue"
          px="xs"
          variant={isActive === i ? "filled" : "subtle"}
        >
          {category.label}
        </Button>
      ))}
    </Group>
  );
};
