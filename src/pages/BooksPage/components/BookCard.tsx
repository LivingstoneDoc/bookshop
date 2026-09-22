import { Card, Image, Text } from "@mantine/core";
import type { Book } from "../../../types/book";
import { generatePath, Link } from "react-router";
import { APP_ROUTES } from "../../../constants/routes";
import { BookCartControls } from "../../../components/BookCartControls";

export const BookCard = (book: Book) => {
  return (
    <Card shadow="sm" padding="lg" withBorder h="100%">
      <Card.Section>
        <Link to={generatePath(APP_ROUTES.BOOK, { id: book.id })}>
          <Image
            src={book.bookCover}
            height={220}
            fit="contain"
            p="md"
            alt={book.title}
          />
        </Link>
      </Card.Section>

      <Link
        to={generatePath(APP_ROUTES.BOOK, { id: book.id })}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Text fw={500} mt="xs" lineClamp={2}>
          {book.title}
        </Text>
        <Text size="sm" fw={400} mt="xs" mb="xs" lineClamp={2}>
          {book.author}
        </Text>
      </Link>

      <BookCartControls book={book} />
    </Card>
  );
};
