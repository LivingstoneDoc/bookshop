import { ActionIcon, TextInput } from "@mantine/core";
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import { useSearch } from "../../Context/searchContext";

export const SearchInput = () => {
  const { searchValue, setSearchValue } = useSearch();
  const searchIcon = <MagnifyingGlassIcon size={20} />;
  const clearIcon = (
    <ActionIcon
      variant="transparent"
      aria-label="Clear"
      onClick={() => setSearchValue("")}
    >
      <XIcon size={16} />
    </ActionIcon>
  );
  return (
    <TextInput
      value={searchValue}
      onChange={(e) => {
        setSearchValue(e.currentTarget.value);
      }}
      label=""
      placeholder="Поиск книги..."
      w={300}
      leftSection={searchIcon}
      rightSection={searchValue && clearIcon}
    />
  );
};
