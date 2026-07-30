import { ActionIcon, Group, Image, Paper, Stack, Text } from "@mantine/core";
import { roubleSign } from "../../../constants/config";
import { MinusIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react";
import type { CartItemProps } from "../../../types/cart";
import { useDispatch } from "react-redux";
import {
  decrementBookCount,
  incrementBookCount,
  removeBook,
} from "../../../redux/slices/cartSlice";
import { DeleteConfirmButton } from "./DeleteConfirmButton";

export const CartItem = ({
  id,
  title,
  bookCover,
  coverType,
  bookFormat,
  price,
  count,
}: CartItemProps) => {
  const dispatch = useDispatch();
  const plusIcon = <PlusIcon size={16} />;
  const minusIcon = <MinusIcon size={16} />;
  const removeIcon = <TrashIcon size={20} />;

  const getBooksPrice = () => {
    return price * count;
  };

  const handleIncrementBookCount = () => {
    dispatch(incrementBookCount(id));
  };

  const handleDecrementBookCount = () => {
    dispatch(decrementBookCount(id));
  };

  const handleRemoveBookItem = () => {
    dispatch(removeBook(id));
  };

  return (
    <Paper withBorder radius="md" p="md">
      <Group justify="space-between">
        <Group>
          <Image src={bookCover} alt="atlant" w={55} fit="contain" />
          <Stack gap={1}>
            <Text fw={500} ta="left">
              {title}
            </Text>
            <Text c="dimmed" ta="left">
              {coverType}, {bookFormat}
            </Text>
          </Stack>
        </Group>
        <Group gap="sm">
          <Group>
            <ActionIcon
              variant="outline"
              radius="50%"
              onClick={handleDecrementBookCount}
              disabled={count === 1}
            >
              {minusIcon}
            </ActionIcon>
            <Text
              fw={500}
              w={30}
              ta="center"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {count}
            </Text>
            <ActionIcon
              variant="outline"
              radius="50%"
              onClick={handleIncrementBookCount}
            >
              {plusIcon}
            </ActionIcon>
          </Group>
          <Group>
            <Text
              fw={500}
              w={90}
              ta="right"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {getBooksPrice()} {roubleSign}
            </Text>
            <DeleteConfirmButton
              icon={removeIcon}
              onConfirm={handleRemoveBookItem}
            />
          </Group>
        </Group>
      </Group>
    </Paper>
  );
};
