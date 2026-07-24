import { ActionIcon, TextInput } from "@mantine/core";
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { useQueryParams } from "../../hooks/useQueryParams";
import { useDebouncedValue } from "@mantine/hooks";

export const SearchInput = () => {
  const { searchValue, setSearchValue } = useQueryParams();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState(searchValue || "");
  const [debouncedInputValue] = useDebouncedValue(inputValue, 400);
  const searchIcon = <MagnifyingGlassIcon size={20} />;

  useEffect(() => {
    setInputValue(searchValue || "");
  }, [searchValue]);

  useEffect(() => {
    if (debouncedInputValue !== (searchValue || "")) {
      setSearchValue(debouncedInputValue);
    }
  }, [debouncedInputValue]);

  const handleClearInput = () => {
    setInputValue("");
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
      value={inputValue}
      onChange={(e) => setInputValue(e.currentTarget.value)}
      label=""
      placeholder="Поиск книги..."
      w={300}
      leftSection={searchIcon}
      rightSection={inputValue && clearIcon}
    />
  );
};
