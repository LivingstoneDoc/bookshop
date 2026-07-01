import { Container, Group, Pagination, SimpleGrid, Title } from "@mantine/core";
import { NavBar } from "./components/NavBar";
import { Sort } from "./components/Sort";
import { BookCard } from "./components/BookCard";
import { booksData } from "../../api/booksFakeDb";

export const BooksPage = () => {
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
          {booksData.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              imgUrl={book.imgUrl}
              coverType={book.coverType}
              coverFormat={book.coverFormat}
              price={book.price}
            />
          ))}
        </SimpleGrid>
        <Pagination total={10} mt="xs" py="md" />
      </Container>
    </main>
  );
};
