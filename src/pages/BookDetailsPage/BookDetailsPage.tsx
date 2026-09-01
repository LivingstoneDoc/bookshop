import { useCallback, useEffect } from "react";
import { useParams } from "react-router";
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { BookCartControls } from "../../components/BookCartControls";
import { BookDetailsSkeleton } from "./BookDetailsSkeleton";
import { ERROR_MESSAGES } from "../../constants/messages";
import { ErrorAlert } from "../../components/ErrorAlert";
import { refreshIcon } from "../../constants/config";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearItemDetails, fetchBookById } from "../../redux/slices/bookSlice";

export const BookDetailsPage = () => {
  const params = useParams();
  const bookData = useAppSelector((state) => state.book.itemDetails);
  const { detailsStatus, detailsError } = useAppSelector((state) => state.book);
  const dispatch = useAppDispatch();

  const handleFetchBookById = useCallback(() => {
    if (params.id) {
      dispatch(fetchBookById(params.id));
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    handleFetchBookById();
    return () => {
      dispatch(clearItemDetails());
    };
  }, [handleFetchBookById]);
  const renderContent = () => {
    if (detailsStatus === "loading") {
      return <BookDetailsSkeleton />;
    }
    if (detailsError === "error" || !bookData) {
      return (
        <ErrorAlert title={ERROR_MESSAGES.COMMON} message={detailsError}>
          <Button
            variant="outline"
            color="red"
            leftSection={refreshIcon}
            w={{ base: "100%", sm: "auto" }}
            onClick={handleFetchBookById}
          >
            Повторить попытку
          </Button>
        </ErrorAlert>
      );
    }
    return (
      <Stack justify="flex-start" gap="xs">
        <Title fw={500} order={2} ta={{ base: "center", sm: "left" }} c="blue">
          {bookData.title}
        </Title>
        <Text fw={400} ta={{ base: "center", sm: "left" }}>
          {bookData.author}
        </Text>
        <Text fw={400} ta={{ base: "center", sm: "left" }}>
          Рейтинг: {bookData.rating}
        </Text>
        <Flex
          direction={{ base: "column", sm: "row" }}
          align={{ base: "center", sm: "flex-start" }}
          gap="sm"
        >
          <Image
            src={bookData.bookCover}
            maw={300}
            w="auto"
            fit="contain"
            p="md"
            pt="xs"
            alt={bookData.title}
          />
          <Stack gap="xl">
            <Text fw={400} ta={{ base: "center", sm: "left" }}>
              {bookData.description}
            </Text>
            <Box w={{ base: "100%", sm: "350px" }} mx={{ base: "auto", sm: 0 }}>
              <BookCartControls book={bookData} />
            </Box>
          </Stack>
        </Flex>
      </Stack>
    );
  };

  return <Container size="lg">{renderContent()}</Container>;
};
