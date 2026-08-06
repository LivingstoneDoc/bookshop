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
import { useCallback, useEffect } from "react";
import { BooksSkeleton } from "./components/BooksSkeleton";
import { useDisclosure } from "@mantine/hooks";
import { PAGINATION } from "../../constants/config";
import { ErrorAlert } from "../../components/ErrorAlert";
import { ERROR_MESSAGES } from "../../constants/messages";
import { ArrowClockwiseIcon } from "@phosphor-icons/react";
import { fetchBooks } from "../../redux/slices/bookSlice";
import { useQueryParams } from "../../hooks/useQueryParams";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export const BooksPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const books = useAppSelector((state) => state.book.items);
  const { totalPages, status, error } = useAppSelector((state) => state.book);
  const dispatch = useAppDispatch();
  const {
    activeCategoryValue,
    activeCategoryLabel,
    activeSortValue,
    currentPage,
    searchValue,
    setCurrentPage,
  } = useQueryParams();
  const refreshIcon = <ArrowClockwiseIcon size={16} />;

  const handleFetchBooks = useCallback(() => {
    dispatch(
      fetchBooks({
        activeCategoryValue,
        activeSortValue,
        currentPage,
        searchValue,
      }),
    );
  }, [
    dispatch,
    activeCategoryValue,
    activeSortValue,
    currentPage,
    searchValue,
  ]);

  useEffect(() => {
    handleFetchBooks();
  }, [activeCategoryValue, activeSortValue, currentPage, searchValue]);

  const renderContent = () => {
    if (status === "error") {
      return (
        <ErrorAlert title={ERROR_MESSAGES.COMMON} message={error}>
          <Button
            variant="outline"
            color="red"
            leftSection={refreshIcon}
            w={{ base: "100%", sm: "auto" }}
            onClick={handleFetchBooks}
          >
            Повторить попытку
          </Button>
        </ErrorAlert>
      );
    }
    if (status === "loading") {
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
          onChange={setCurrentPage}
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
          {activeCategoryLabel}
        </Title>
        {renderContent()}
      </Container>
    </>
  );
};
