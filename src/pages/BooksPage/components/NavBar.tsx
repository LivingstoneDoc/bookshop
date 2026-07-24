import { Button, Flex } from "@mantine/core";
import { categoriesList } from "../../../constants/config";
import type { CategoryValue } from "../../../types/categories";
import { useQueryParams } from "../../../hooks/useQueryParams";

interface NavBarProps {
  onCloseDrawer?: () => void;
}

export const NavBar = ({ onCloseDrawer }: NavBarProps) => {
  const { activeCategoryValue, setActiveCategoryValue } = useQueryParams();

  const handleMobileCategoryChange = (value: CategoryValue) => {
    setActiveCategoryValue(value);
    onCloseDrawer?.();
  };

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
          onClick={() => handleMobileCategoryChange(category.value)}
          color="blue"
          px="xs"
          variant={activeCategoryValue === category.value ? "filled" : "subtle"}
          w={{ base: "100%", sm: "auto" }}
        >
          {category.label}
        </Button>
      ))}
    </Flex>
  );
};
