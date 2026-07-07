import { Button, Container, Stack, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Container size="lg" py="md">
      <Stack align="center" gap="md">
        <Title order={2}>Ошибка 404</Title>
        <Text>Страница не найдена</Text>
        <Button onClick={() => navigate("/")}>На главную</Button>
      </Stack>
    </Container>
  );
};
