import { Button, Flex } from "@mantine/core";
import { categoriesList } from "../../../constants/config";
import type { CategoryValue } from "../../../types/categories";

interface NavBarProps {
  activeCategory: CategoryValue;
  onChange: (value: CategoryValue) => void;
}

export const NavBar = ({ activeCategory, onChange }: NavBarProps) => {
  return (
    <Flex
      direction={{ base: "column", sm: "row" }}
      justify="flex-start"
      align={{ base: "stretch", sm: "center" }}
      gap="md"
      w="100%"
    >
      {categoriesList.map((category) => (
        <Button
          key={category.value}
          onClick={() => onChange(category.value)}
          color="blue"
          px="xs"
          variant={activeCategory === category.value ? "filled" : "subtle"}
          w={{ base: "100%", sm: "auto" }}
        >
          {category.label}
        </Button>
      ))}
    </Flex>
  );
};
