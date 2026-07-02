import { Container, Group, Pagination, SimpleGrid, Title } from "@mantine/core";
import { NavBar } from "./components/NavBar";
import { Sort } from "./components/Sort";
import { BookCard } from "./components/BookCard";
import { useEffect, useState } from "react";
import type { Book } from "../../types/book";
import { API_ENDPOINTS } from "../../constants/endpoints";

export const BooksPage = () => {
  const [books, setBooks] = useState<Book[] | null>([]);
  useEffect(() => {
    if (!books) return;
    const fetchBooks = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.BOOKS.GET_ALL);
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);
  return (
    <main>
      <Container size="lg" py="md">
        <Group justify="space-between" align="flex-end" mt="md">
          <NavBar />
          <Sort />
        </Group>
        <Title order={1} mt="xl" c="blue" style={{ textAlign: "left" }}>
          Все книги
        </Title>
        <SimpleGrid
          cols={{ base: 1, xs: 2, md: 3, lg: 4 }}
          spacing="md"
          mt="md"
        >
          {books &&
            books.map((book) => (
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
      </Container>
    </main>
  );
};
