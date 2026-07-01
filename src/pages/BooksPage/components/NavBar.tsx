import { Button, Group } from "@mantine/core";

export const NavBar = () => {
  return (
    <Group justify="flex-start" align="center" gap="xs">
      <Button>Все</Button>
      <Button>Саморазвитие</Button>
      <Button>Детектив</Button>
      <Button>Русская Проза</Button>
      <Button>Зарубежная Проза</Button>
      <Button>IT</Button>
    </Group>
  );
};
