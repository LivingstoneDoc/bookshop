import { Button, Container, Group, Stack, Title } from "@mantine/core";
import { TrashIcon } from "@phosphor-icons/react";
import { CartItem } from "./components/CartItem";

export const CartPage = () => {
  const trashIcon = <TrashIcon size={16} />;

  return (
    <Container size="lg" py="md">
      <Stack gap="md">
        <Group justify="space-between" align="flex-end">
          <Title order={2} c="blue">
            Корзина
          </Title>
          <Button variant="subtle" fw={500} leftSection={trashIcon}>
            Очистить корзину
          </Button>
        </Group>

        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
      </Stack>
    </Container>
  );
};
