import "@mantine/core/styles.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/700.css";
import { createTheme } from "@mantine/core";
import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router";
import { router } from "./Router/router";

const myTheme = createTheme({
  fontFamily: "Montserrat, sans-serif",
  headings: {
    fontFamily: "Montserrat, sans-serif",
  },
});

function App() {
  return (
    <MantineProvider theme={myTheme}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
