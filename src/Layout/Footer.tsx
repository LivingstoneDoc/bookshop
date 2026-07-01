import { Container, Divider, Stack, Text } from "@mantine/core";

export const Footer = () => {
  return (
    <footer>
      <Divider />
      <Container size="lg">
        <Stack py="md" gap="xs" align="center">
          <Text>Bookshop</Text>
          <Text>2026</Text>
        </Stack>
      </Container>
    </footer>
  );
};
