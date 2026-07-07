import { Container, Group, Pagination, SimpleGrid, Title } from "@mantine/core";
import { NavBar } from "./components/NavBar";
import { Sort } from "./components/Sort";
import { BookCard } from "./components/BookCard";
import { useEffect, useState } from "react";
import type { Book } from "../../types/book";
import { API_ENDPOINTS } from "../../constants/endpoints";
import { BooksSkeleton } from "./components/BooksSkeleton";

export const BooksPage = () => {
  const [books, setBooks] = useState<Book[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);
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
    <Container size="lg">
      <Group justify="space-between" align="flex-end" gap="xs">
        <NavBar />
        <Sort />
      </Group>
      <Title order={1} mt="xl" c="blue" style={{ textAlign: "left" }}>
        Все книги
      </Title>
      {renderContent()}
    </Container>
  );
};
