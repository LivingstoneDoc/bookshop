import { Button, Container, Group, Stack, Text, Title } from "@mantine/core";
import { TrashIcon } from "@phosphor-icons/react";
import { CartItem } from "./components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { clearCart } from "../../redux/slices/cartSlice";
import { EmptyCart } from "./components/EmptyCart";
import { modals } from "@mantine/modals";

export const CartPage = () => {
  const { cartItems, totalPrice } = useSelector(
    (state: RootState) => state.cart,
  );
  const dispatch = useDispatch();
  const trashIcon = <TrashIcon size={16} />;

  const openClearCartModal = () => {
    modals.openConfirmModal({
      title: "Очистка корзины",
      centered: true,
      children: (
        <Text size="sm">
          Вы действительно хотите удалить все товары из корзины?
        </Text>
      ),
      labels: { confirm: "Удалить все", cancel: "Отмена" },
      confirmProps: { color: "red" },
      onConfirm: () => dispatch(clearCart()),
    });
  };

  const renderContent = () => {
    if (totalPrice === 0) {
      return <EmptyCart />;
    }
    return (
      <Container size="lg" py="md">
        <Stack gap="md">
          <Group justify="space-between" align="flex-end">
            <Title order={2} c="blue">
              Корзина
            </Title>
            <Button
              variant="subtle"
              fw={500}
              leftSection={trashIcon}
              onClick={openClearCartModal}
            >
              Очистить корзину
            </Button>
          </Group>

          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </Stack>
      </Container>
    );
  };

  return <>{renderContent()}</>;
};
