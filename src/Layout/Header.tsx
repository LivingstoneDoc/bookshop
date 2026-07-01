import {
  Button,
  Container,
  Divider,
  Group,
  Text,
  TextInput,
} from "@mantine/core";
import { MagnifyingGlassIcon, ShoppingCartIcon } from "@phosphor-icons/react";
import { roubleSign } from "../constants";

export const Header = () => {
  const searchIcon = <MagnifyingGlassIcon size={20} />;
  const cartIcon = <ShoppingCartIcon size={20} />;
  return (
    <header>
      <Container size="lg">
        <Group justify="space-between" align="center" py="md">
          <Text size="xl" fw={700} c="blue">
            BookShop
          </Text>
          <TextInput
            label=""
            placeholder="Поиск книги..."
            w={300}
            leftSection={searchIcon}
          />
          <Button>
            <Group>
              <Group gap="xs">
                <Text>{0}</Text>
                <Text>{roubleSign}</Text>
              </Group>{" "}
              <Text
                style={{
                  backgroundColor: "hsla(0, 0%, 100%)",
                  height: "25px",
                  width: "1px",
                }}
              ></Text>
              <Group gap="xs">
                {cartIcon}
                <Text>{0}</Text>
              </Group>
            </Group>
          </Button>
        </Group>
      </Container>
      <Divider />
    </header>
  );
};
