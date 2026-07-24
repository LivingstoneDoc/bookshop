import { Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AppShell } from "@mantine/core";

export const RootLayout = () => {
  return (
    <AppShell
      header={{ height: { base: 120, sm: 60 } }}
      footer={{ height: 60, offset: false }}
      padding="md"
    >
      <AppShell.Header component="header">
        <Header />
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      <AppShell.Footer
        component="footer"
        style={{ position: "static", marginTop: "auto" }}
      >
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
};
