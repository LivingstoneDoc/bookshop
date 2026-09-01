import { Button, SegmentedControl, Stack, Text } from "@mantine/core";
import { CART, roubleSign } from "../constants/config";
import { PlusIcon } from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import { addBook, cartSelector } from "../redux/slices/cartSlice";
import { useState } from "react";
import type { Book } from "../types/book";
import type { CartItemProps } from "../types/cart";

interface BookCartControlProps {
  book: Book;
}

export const BookCartControls = ({ book }: BookCartControlProps) => {
  const { cartItems } = useSelector(cartSelector);
  const dispatch = useDispatch();
  const coverTypes = ["мягкая", "твердая"];
  const [activeBookCoverType, setActiveBookCoverType] = useState(
    coverTypes[book.coverTypesIndex[0]],
  );
  const [activeBookFormat, setActiveBookFormat] = useState(book.bookFormats[0]);
  const addIcon = <PlusIcon size={20} />;
  const cartItemId = `${book.id}-${activeBookCoverType}-${activeBookFormat}`;
  const foundCartItem = cartItems.find((item) => item.id === cartItemId);
  const bookCount = foundCartItem ? foundCartItem.count : 0;
  const handleAddBook = () => {
    const cartItem: CartItemProps = {
      id: cartItemId,
      productId: book.id,
      title: book.title,
      bookCover: book.bookCover,
      coverType: activeBookCoverType,
      bookFormat: activeBookFormat,
      price: book.price,
      count: CART.DEFAULT_AMOUNT,
    };
    dispatch(addBook(cartItem));
  };
  return (
    <Stack mt="auto" mb="xs" gap="xs">
      <SegmentedControl
        color="blue"
        fullWidth
        value={activeBookCoverType}
        onChange={setActiveBookCoverType}
        data={book.coverTypesIndex.map((type) => coverTypes[type])}
      />
      <SegmentedControl
        color="blue"
        fullWidth
        value={activeBookFormat}
        onChange={setActiveBookFormat}
        data={book.bookFormats.map((format) => format)}
      />
      <Text size="md" mt="xs" fw={700}>
        от {book.price} {roubleSign}
      </Text>
      <Button
        color="blue"
        leftSection={addIcon}
        styles={{ section: { marginRight: "4px" } }}
        onClick={handleAddBook}
      >
        Добавить
        {bookCount > 0 && <Text ml="4px">{bookCount}</Text>}
      </Button>
    </Stack>
  );
};
