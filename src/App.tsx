import "@mantine/core/styles.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/700.css";
import { createTheme } from "@mantine/core";
import { MantineProvider } from "@mantine/core";
import { Header } from "./Layout/Header";
import { Footer } from "./Layout/Footer";
import { BooksPage } from "./pages/BooksPage/BooksPage";

const myTheme = createTheme({
  fontFamily: "Montserrat, sans-serif",
  headings: {
    fontFamily: "Montserrat, sans-serif",
  },
});

function App() {
  return (
    <MantineProvider theme={myTheme}>
      <Header />
      <BooksPage />
      <Footer />
    </MantineProvider>
  );
}

export default App;
