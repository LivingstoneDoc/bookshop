import {
  Box,
  Button,
  Container,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { APP_ROUTES } from "../../../constants/routes";
import CartImg from "../../../assets/img/cart.png";
import { useNavigate } from "react-router";

export const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 200px)",
      }}
    >
      <Container size="xs">
        <Stack align="center" gap="xl">
          <Image
            src={CartImg}
            alt="Корзина"
            w={180}
            style={{ filter: "grayscale(0.2) opacity(0.8)" }}
          />

          <Stack gap="md">
            <Title order={2} fw={700} c="blue">
              Корзина пуста
            </Title>
            <Text c="dimmed" size="sm" px="md">
              Похоже, вы еще ничего не добавили. Исправьте это, заглянув в наш
              каталог книг!
            </Text>
          </Stack>

          <Button
            variant="light"
            color="blue"
            size="md"
            fullWidth
            onClick={() => navigate(APP_ROUTES.HOME)}
            radius="md"
          >
            Перейти к покупкам
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};
