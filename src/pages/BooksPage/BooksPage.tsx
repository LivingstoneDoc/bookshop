import { Container, Group, Pagination, SimpleGrid, Title } from "@mantine/core";
import { NavBar } from "./components/NavBar";
import { Sort } from "./components/Sort";
import { BookCard } from "./components/BookCard";
import atlant from "../../assets/img/atlant.png";
import god from "../../assets/img/god.png";
import tenNiggers from "../../assets/img/ten_niggers.png";
import clearCode from "../../assets/img/clear_code.png";

const booksData = [
  {
    id: "1",
    title: "Атлант расправил плечи (Комплект из трех книг",
    author: "Айн Рэнд",
    imgUrl: atlant,
    price: 700,
  },
  {
    id: "2",
    title: "Бог всегда путешествует инкогнито",
    author: "Лоран Гунель",
    imgUrl: god,
    price: 400,
  },
  {
    id: "3",
    title: "Десять негритят",
    author: "Агата Кристи",
    imgUrl: tenNiggers,
    price: 350,
  },
  {
    id: "4",
    title: "Чистый код",
    author: "Роберт Мартин",
    imgUrl: clearCode,
    price: 500,
  },
];

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
              price={book.price}
            />
          ))}
        </SimpleGrid>
        <Pagination total={10} mt="xs" py="md" />
      </Container>
    </main>
  );
};
