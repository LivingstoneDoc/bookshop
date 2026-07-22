import "@mantine/core/styles.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/700.css";
import { createTheme } from "@mantine/core";
import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router";
import { router } from "./Router/router";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const myTheme = createTheme({
  fontFamily: "Montserrat, sans-serif",
  headings: {
    fontFamily: "Montserrat, sans-serif",
  },
});

function App() {
  return (
    <Provider store={store}>
      <MantineProvider theme={myTheme}>
        <RouterProvider router={router} />
      </MantineProvider>
    </Provider>
  );
}

export default App;
