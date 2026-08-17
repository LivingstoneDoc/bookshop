import {
  Button,
  Card,
  Image,
  SegmentedControl,
  Stack,
  Text,
} from "@mantine/core";
import { PlusIcon } from "@phosphor-icons/react";
import { CART, roubleSign } from "../../../constants/config";
import type { Book } from "../../../types/book";
import { useDispatch, useSelector } from "react-redux";
import { addBook, cartSelector } from "../../../redux/slices/cartSlice";
import { useState } from "react";
import type { CartItemProps } from "../../../types/cart";

export const BookCard = ({
  id,
  title,
  author,
  bookCover,
  coverTypesIndex,
  bookFormats,
  category,
  price,
}: Book) => {
  const { cartItems } = useSelector(cartSelector);
  const dispatch = useDispatch();
  const coverTypes = ["мягкая", "твердая"];
  const [activeBookCoverType, setActiveBookCoverType] = useState(
    coverTypes[coverTypesIndex[0]],
  );
  const [activeBookFormat, setActiveBookFormat] = useState(bookFormats[0]);
  const addIcon = <PlusIcon size={20} />;
  const cartItemId = `${id}-${activeBookCoverType}-${activeBookFormat}`;
  const foundCartItem = cartItems.find((item) => item.id === cartItemId);
  const bookCount = foundCartItem ? foundCartItem.count : 0;
  const handleAddBook = () => {
    const cartItem: CartItemProps = {
      id: cartItemId,
      productId: id,
      title,
      bookCover,
      coverType: activeBookCoverType,
      bookFormat: activeBookFormat,
      price,
      count: CART.DEFAULT_AMOUNT,
    };
    dispatch(addBook(cartItem));
  };
  return (
    <Card shadow="sm" padding="lg" withBorder h="100%">
      <Card.Section>
        <Image src={bookCover} height={220} fit="contain" p="md" alt={title} />
      </Card.Section>

      <Text fw={500} mt="xs" lineClamp={2}>
        {title}
      </Text>
      <Text size="sm" fw={400} mt="xs" mb="xs" lineClamp={2}>
        {author}
      </Text>

      <Stack mt="auto" mb="xs" gap="xs">
        <SegmentedControl
          color="blue"
          fullWidth
          value={activeBookCoverType}
          onChange={setActiveBookCoverType}
          data={coverTypesIndex.map((type) => coverTypes[type])}
        />
        <SegmentedControl
          color="blue"
          fullWidth
          value={activeBookFormat}
          onChange={setActiveBookFormat}
          data={bookFormats.map((format) => format)}
        />
        <Text size="md" mt="xs" fw={700}>
          от {price} {roubleSign}
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
    </Card>
  );
};
