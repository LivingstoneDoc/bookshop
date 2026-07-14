import { Button, Group, Stack, Text } from "@mantine/core";
import { ShoppingCartIcon } from "@phosphor-icons/react";
import { roubleSign } from "../constants/config";
import { Link, useNavigate } from "react-router";
import { useMediaQuery } from "@mantine/hooks";
import { SearchInput } from "./components/SearchInput";

export const Header = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const cartIcon = <ShoppingCartIcon size={20} />;
  if (isMobile) {
    return (
      <Stack h="100%" justify="center" align="center" gap="md" px="md" py="xs">
        <Group justify="space-between">
          <Link to="/" style={{ textDecoration: "none" }}>
            <Text size="xl" fw={700} c="blue">
              BookShop
            </Text>
          </Link>
          <Button px="xs" onClick={() => navigate("/cart")}>
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
        <SearchInput />
      </Stack>
    );
  }
  return (
    <Group h="100%" justify="space-between" align="center" px="md">
      <Link to="/" style={{ textDecoration: "none" }}>
        <Text size="xl" fw={700} c="blue">
          BookShop
        </Text>
      </Link>
      <SearchInput />
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
