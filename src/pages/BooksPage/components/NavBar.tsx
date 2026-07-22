import { Button, Flex } from "@mantine/core";
import { categoriesList } from "../../../constants/config";
import type { CategoryValue } from "../../../types/categories";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { changeCategory } from "../../../redux/slices/filterSlice";

interface NavBarProps {
  onCloseDrawer?: () => void;
}

export const NavBar = ({ onCloseDrawer }: NavBarProps) => {
  const activeCategory = useSelector(
    (state: RootState) => state.filter.category,
  );
  const dispatch = useDispatch();

  const handleMobileCategoryChange = (value: CategoryValue) => {
    dispatch(changeCategory(value));
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
          variant={activeCategory === category.value ? "filled" : "subtle"}
          w={{ base: "100%", sm: "auto" }}
        >
          {category.label}
        </Button>
      ))}
    </Flex>
  );
};
