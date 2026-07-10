import {
  Box,
  Burger,
  Button,
  Container,
  Drawer,
  Group,
  Pagination,
  SimpleGrid,
  Stack,
  Title,
} from "@mantine/core";
import { NavBar } from "./components/NavBar";
import { Sort } from "./components/Sort";
import { BookCard } from "./components/BookCard";
import { useEffect, useState } from "react";
import type { Book } from "../../types/book";
import { API_ENDPOINTS } from "../../constants/endpoints";
import { BooksSkeleton } from "./components/BooksSkeleton";
import { useDisclosure } from "@mantine/hooks";
import { defaultCategory, defaultSortingItem } from "../../constants/config";
import type { CategoryValue } from "../../types/categories";
import type { SortValue } from "../../types/sort";
import { ErrorAlert } from "../../components/ErrorAlert";
import { ERROR_MESSAGES } from "../../constants/messages";
import { ArrowClockwiseIcon } from "@phosphor-icons/react";

export const BooksPage = () => {
  const [books, setBooks] = useState<Book[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [activeCategoryValue, setActiveCategoryValue] =
    useState<CategoryValue>(defaultCategory);
  const [activeSortValue, setActiveSortValue] =
    useState<SortValue>(defaultSortingItem);
  const refreshIcon = <ArrowClockwiseIcon size={16} />;
  const fetchBooks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const url = new URL(API_ENDPOINTS.BOOKS.GET_ALL);

      if (activeCategoryValue !== null) {
        url.searchParams.append("category", String(activeCategoryValue));
      }

      if (activeSortValue.includes("_")) {
        const [sortBy, order] = activeSortValue.split("_");
        url.searchParams.append("sortBy", sortBy);
        url.searchParams.append("order", order);
      } else {
        url.searchParams.append("sortBy", activeSortValue);
        url.searchParams.append("order", "desc");
      }

      const response = await fetch(url.toString());
      const data = await response.json();
      console.log("data", data);
      if (Array.isArray(data)) {
        setBooks(data);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setError(ERROR_MESSAGES.FETCH_BOOKS_FAILED);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, [activeCategoryValue, activeSortValue]);

  const handleMobileCategoryChange = (value: CategoryValue) => {
    setActiveCategoryValue(value);
    close();
  };

  const renderContent = () => {
    if (error) {
      return (
        <ErrorAlert title={ERROR_MESSAGES.COMMON} message={error}>
          <Button
            variant="outline"
            color="red"
            leftSection={refreshIcon}
            w={{ base: "100%", sm: "auto" }}
            onClick={fetchBooks}
          >
            Повторить попытку
          </Button>
        </ErrorAlert>
      );
    }
    if (isLoading) {
      return <BooksSkeleton />;
    }
    if (!books || books.length === 0) {
      return (
        <Title order={3} mt="xl" c="dimmed" ta="left">
          Книги не найдены
        </Title>
      );
    }
    return (
      <>
        <SimpleGrid
          cols={{ base: 1, xs: 2, md: 3, lg: 4 }}
          spacing="md"
          mt="md"
        >
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              bookCover={book.bookCover}
              coverTypesIndex={book.coverTypesIndex}
              bookFormats={book.bookFormats}
              price={book.price}
              category={book.category}
            />
          ))}
        </SimpleGrid>
        <Pagination total={10} mt="xs" py="md" />
      </>
    );
  };
  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Категории книг"
        padding="md"
        size="sm"
        hiddenFrom="sm"
      >
        <Stack justify="flex-start" align="flex-start" gap="xs">
          <NavBar
            activeCategory={activeCategoryValue}
            onChange={handleMobileCategoryChange}
          />
        </Stack>
      </Drawer>
      <Container size="lg">
        <Group justify="space-between" align="flex-end">
          <Burger onClick={open} hiddenFrom="sm" />

          <Box visibleFrom="sm">
            <NavBar
              activeCategory={activeCategoryValue}
              onChange={setActiveCategoryValue}
            />
          </Box>
          <Sort
            activeSort={activeSortValue}
            onChangeSort={setActiveSortValue}
          />
        </Group>
        <Title order={1} mt="xl" c="blue" style={{ textAlign: "left" }}>
          Все книги
        </Title>
        {renderContent()}
      </Container>
    </>
  );
};
