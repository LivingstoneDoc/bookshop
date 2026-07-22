import { ActionIcon, TextInput } from "@mantine/core";
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import { useSearch } from "../../Context/searchContext";
import { useRef } from "react";

export const SearchInput = () => {
  const { searchValue, setSearchValue } = useSearch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchIcon = <MagnifyingGlassIcon size={20} />;

  const handleClearInput = () => {
    setSearchValue("");
    inputRef.current?.focus();
  };

  const clearIcon = (
    <ActionIcon
      variant="transparent"
      aria-label="Clear"
      onClick={handleClearInput}
    >
      <XIcon size={16} />
    </ActionIcon>
  );

  return (
    <TextInput
      ref={inputRef}
      value={searchValue}
      onChange={(e) => setSearchValue(e.currentTarget.value)}
      label=""
      placeholder="Поиск книги..."
      w={300}
      leftSection={searchIcon}
      rightSection={searchValue && clearIcon}
    />
  );
};
