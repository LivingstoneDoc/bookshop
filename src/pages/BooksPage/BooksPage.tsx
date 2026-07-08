import {
  Box,
  Burger,
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

export const BooksPage = () => {
  const [books, setBooks] = useState<Book[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [activeCategory, setActiveCategory] = useState(0);
  useEffect(() => {
    if (!books) return;
    const fetchBooks = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.BOOKS.GET_ALL);
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleMobileCategoryChange = (id: number) => {
    setActiveCategory(id);
    close();
  };

  const renderContent = () => {
    if (isLoading) {
      return <BooksSkeleton />;
    }
    if (!books || books.length === 0) {
      return (
        <Title order={3} mt="xl" c="gray" ta="left">
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
            activeId={activeCategory}
            onChange={handleMobileCategoryChange}
          />
        </Stack>
      </Drawer>
      <Container size="lg">
        <Group justify="space-between" align="flex-end">
          <Burger onClick={open} hiddenFrom="sm" />

          <Box visibleFrom="sm">
            <NavBar activeId={activeCategory} onChange={setActiveCategory} />
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
