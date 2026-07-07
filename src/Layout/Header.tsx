import { Button, Group, Text, TextInput } from "@mantine/core";
import { MagnifyingGlassIcon, ShoppingCartIcon } from "@phosphor-icons/react";
import { roubleSign } from "../constants/config";
import { Link, useNavigate } from "react-router";

export const Header = () => {
  const navigate = useNavigate();
  const searchIcon = <MagnifyingGlassIcon size={20} />;
  const cartIcon = <ShoppingCartIcon size={20} />;
  return (
    <Group h="100%" justify="space-between" align="center" px="md">
      <Link to="/" style={{ textDecoration: "none" }}>
        <Text size="xl" fw={700} c="blue">
          BookShop
        </Text>
      </Link>
      <TextInput
        label=""
        placeholder="Поиск книги..."
        w={300}
        leftSection={searchIcon}
      />
      <Button onClick={() => navigate("/cart")}>
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
  );
};
