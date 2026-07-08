import { Button, Flex } from "@mantine/core";

interface NavBarProps {
  activeId: number;
  onChange: (id: number) => void;
}

const categoriesList = [
  { id: "1", label: "Все", value: "all" },
  { id: "2", label: "Саморазвитие", value: "self-development" },
  { id: "3", label: "Детектив", value: "detective" },
  { id: "4", label: "Русская Проза", value: "russian-prose" },
  { id: "5", label: "Зарубежная Проза", value: "foreign-prose" },
  { id: "6", label: "IT", value: "it" },
];

export const NavBar = ({ activeId, onChange }: NavBarProps) => {
  return (
    <Flex
      direction={{ base: "column", sm: "row" }}
      justify="flex-start"
      align={{ base: "stretch", sm: "center" }}
      gap="md"
      w="100%"
    >
      {categoriesList.map((category, i) => (
        <Button
          key={category.id}
          onClick={() => onChange(i)}
          color="blue"
          px="xs"
          variant={activeId === i ? "filled" : "subtle"}
          w={{ base: "100%", sm: "auto" }}
        >
          {category.label}
        </Button>
      ))}
    </Flex>
  );
};
