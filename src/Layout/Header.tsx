import { Group, Stack, Text } from "@mantine/core";
import { Link, useLocation } from "react-router";
import { useMediaQuery } from "@mantine/hooks";
import { SearchInput } from "./components/SearchInput";
import { CartButton } from "./components/CartButton";

export const Header = () => {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isHomePage = location.pathname === "/";
  if (isMobile) {
    return (
      <Stack h="100%" justify="center" align="center" gap="md" px="md" py="xs">
        <Group justify="space-between">
          <MainLogo />
          <CartButton />
        </Group>
        {isHomePage && <SearchInput />}
      </Stack>
    );
  }
  return (
    <Group h="100%" justify="space-between" align="center" px="md">
      <MainLogo />
      {isHomePage && <SearchInput />}
      <CartButton />
    </Group>
  );
};

const MainLogo = () => {
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <Text size="xl" fw={700} c="blue">
        BookShop
      </Text>
    </Link>
  );
};
