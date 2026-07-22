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
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { PAGINATION } from "../../constants/config";
import { ErrorAlert } from "../../components/ErrorAlert";
import { ERROR_MESSAGES } from "../../constants/messages";
import { ArrowClockwiseIcon } from "@phosphor-icons/react";
import { useSearch } from "../../Context/searchContext";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import {
  changeCurrentPage,
  changeTotalPages,
} from "../../redux/slices/booksParamsSlice";

export const BooksPage = () => {
  const [books, setBooks] = useState<Book[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const { searchValue } = useSearch();
  const [debouncedSearch] = useDebouncedValue(searchValue, 400);
  const currentPage = useSelector(
    (state: RootState) => state.params.currentPage,
  );
  const totalPages = useSelector((state: RootState) => state.params.totalPages);
  const dispatch = useDispatch();
  const activeCategoryValue = useSelector(
    (state: RootState) => state.params.category,
  );
  const activeSortValue = useSelector(
    (state: RootState) => state.params.sortValue,
  );
  const refreshIcon = <ArrowClockwiseIcon size={16} />;
  const fetchBooks = async () => {
    setIsLoading(true);
    setError(null);
    const normalizedInputSearch = debouncedSearch.trim();
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

      if (normalizedInputSearch !== "") {
        url.searchParams.append("search", normalizedInputSearch);
      }

      const fullResponse = await fetch(url.toString());
      if (!fullResponse.ok) {
        setBooks([]);
        dispatch(changeTotalPages(0));
        return;
      }
      const allItems = await fullResponse.json();
      const totalCount = Array.isArray(allItems) ? allItems.length : 0;
      const calculatedTotalPages = Math.ceil(
        totalCount / PAGINATION.ITEMS_PER_PAGE,
      );
      dispatch(changeTotalPages(calculatedTotalPages));

      if (totalCount === 0) {
        setBooks([]);
        return;
      }

      const paginatedUrl = new URL(url.toString());
      paginatedUrl.searchParams.append("page", String(currentPage));
      paginatedUrl.searchParams.append(
        "limit",
        String(PAGINATION.ITEMS_PER_PAGE),
      );

      const response = await fetch(paginatedUrl.toString());
      if (!response.ok) {
        setBooks([]);
        dispatch(changeTotalPages(0));
        return;
      }
      const data = await response.json();

      setBooks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError(ERROR_MESSAGES.FETCH_BOOKS_FAILED);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    dispatch(changeCurrentPage(PAGINATION.DEFAULT_PAGE));
  }, [activeCategoryValue, activeSortValue, debouncedSearch]);

  useEffect(() => {
    fetchBooks();
  }, [activeCategoryValue, activeSortValue, debouncedSearch, currentPage]);

  const handlePageChange = (newPage: number) => {
    dispatch(changeCurrentPage(newPage));
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
        <Pagination
          value={currentPage}
          onChange={handlePageChange}
          total={totalPages > 0 ? totalPages : PAGINATION.DEFAULT_PAGE}
          mt="xs"
          py="md"
        />
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
          <NavBar onCloseDrawer={close} />
        </Stack>
      </Drawer>
      <Container size="lg">
        <Group justify="space-between" align="flex-end">
          <Burger onClick={open} hiddenFrom="sm" />

          <Box visibleFrom="sm">
            <NavBar />
          </Box>
          <Sort />
        </Group>
        <Title order={1} mt="xl" c="blue" style={{ textAlign: "left" }}>
          Все книги
        </Title>
        {renderContent()}
      </Container>
    </>
  );
};
